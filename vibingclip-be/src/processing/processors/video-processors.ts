import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiBridgeService } from '../../ai-bridge/ai-bridge.service';
import { Clip } from '../../clips/entities/clip.entity';
import { Project } from '../../projects/entities/project.entity';
import { ProcessingJob, ProcessingJobStatus, ProcessingJobType } from '../entities/processing-job.entity';
import { ProcessingService } from '../processing.service';
import { FfmpegService } from '../ffmpeg.service';

@Injectable()
@Processor('video-processing')
export class VideoProcessingProcessor extends WorkerHost {
  private readonly logger = new Logger(VideoProcessingProcessor.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    @InjectRepository(Clip)
    private readonly clipsRepo: Repository<Clip>,
    @InjectRepository(ProcessingJob)
    private readonly jobsRepo: Repository<ProcessingJob>,
    private readonly aiBridge: AiBridgeService,
    private readonly processingService: ProcessingService,
    private readonly ffmpegService: FfmpegService
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name as ProcessingJobType) {
      case 'project.ingest':
        return this.handleIngest(job.data.projectId);
      case 'video.extract-metadata':
        return this.handleMetadata(job.data.projectId);
      case 'video.transcribe':
        return this.handleTranscription(job.data.projectId);
      case 'video.analyze':
        return this.handleAnalysis(job.data.projectId, job.data.transcript, job.data.language);
      case 'video.render-clip':
        return this.handleRenderClip(job.data.clipId);
      default:
        this.logger.warn(`Unknown job type: ${job.name}`);
    }
  }

  private async updateJobStatus(
    projectId: string,
    type: ProcessingJobType,
    status: ProcessingJobStatus,
    errorMessage?: string
  ) {
    const job = await this.jobsRepo.findOne({
      where: { project: { id: projectId }, type },
      order: { createdAt: 'DESC' }
    });
    if (job) {
      job.status = status;
      job.errorMessage = errorMessage;
      await this.jobsRepo.save(job);
    }
  }

  private async handleIngest(projectId: string) {
    try {
      await this.updateJobStatus(projectId, 'project.ingest', 'processing');
      await this.projectsRepo.update(projectId, { status: 'processing' });
      await this.processingService.enqueueNext(projectId, 'video.extract-metadata');
      await this.updateJobStatus(projectId, 'project.ingest', 'completed');
    } catch (error: any) {
      this.logger.error(`Ingest failed: ${error.message}`);
      await this.projectsRepo.update(projectId, { status: 'failed' });
      await this.updateJobStatus(projectId, 'project.ingest', 'failed', error.message);
      throw error;
    }
  }

  private async handleMetadata(projectId: string) {
    try {
      await this.updateJobStatus(projectId, 'video.extract-metadata', 'processing');
      const project = await this.projectsRepo.findOne({ where: { id: projectId } });
      if (!project) throw new Error('Project not found');
      const targetPath = project.originalFilePath || project.sourceUrl || '';
      const metadata = await this.ffmpegService.getMetadata(targetPath);
      project.durationSeconds = metadata.durationSeconds;
      await this.projectsRepo.save(project);
      await this.processingService.enqueueNext(projectId, 'video.transcribe');
      await this.updateJobStatus(projectId, 'video.extract-metadata', 'completed');
    } catch (error: any) {
      this.logger.error(`Metadata failed: ${error.message}`);
      await this.projectsRepo.update(projectId, { status: 'failed' });
      await this.updateJobStatus(projectId, 'video.extract-metadata', 'failed', error.message);
      throw error;
    }
  }

  private async handleTranscription(projectId: string) {
    try {
      await this.updateJobStatus(projectId, 'video.transcribe', 'processing');
      const project = await this.projectsRepo.findOne({ where: { id: projectId } });
      if (!project) throw new Error('Project not found');
      const pathOrUrl = project.originalFilePath || project.sourceUrl || '';
      const result = await this.aiBridge.transcribeAudio(pathOrUrl);
      await this.processingService.enqueueNext(projectId, 'video.analyze', {
        transcript: result.transcript,
        language: result.language
      });
      await this.updateJobStatus(projectId, 'video.transcribe', 'completed');
    } catch (error: any) {
      this.logger.error(`Transcription failed: ${error.message}`);
      await this.projectsRepo.update(projectId, { status: 'failed' });
      await this.updateJobStatus(projectId, 'video.transcribe', 'failed', error.message);
      throw error;
    }
  }

  private async handleAnalysis(projectId: string, transcript?: string, language?: string) {
    try {
      await this.updateJobStatus(projectId, 'video.analyze', 'processing');
      const project = await this.projectsRepo.findOne({ where: { id: projectId } });
      if (!project) throw new Error('Project not found');
      const transcriptText = transcript || 'Default transcript placeholder';
      const durationSeconds = project.durationSeconds || 120;
      const suggested = await this.aiBridge.suggestClipsFromTranscript({
        transcript: transcriptText,
        durationSeconds,
        language,
        maxClips: 5
      });

      for (const suggestion of suggested) {
        const clip = this.clipsRepo.create({
          project,
          title: suggestion.title,
          description: suggestion.title,
          startTime: suggestion.startTime,
          endTime: suggestion.endTime,
          durationSeconds: suggestion.endTime - suggestion.startTime,
          viralityScore: suggestion.viralityScore,
          tags: suggestion.tags,
          aspectRatio: '9:16'
        });
        await this.clipsRepo.save(clip);
      }

      await this.projectsRepo.update(projectId, { status: 'completed' });
      await this.updateJobStatus(projectId, 'video.analyze', 'completed');
    } catch (error: any) {
      this.logger.error(`Analysis failed: ${error.message}`);
      await this.projectsRepo.update(projectId, { status: 'failed' });
      await this.updateJobStatus(projectId, 'video.analyze', 'failed', error.message);
      throw error;
    }
  }

  private async handleRenderClip(clipId: string) {
    try {
      const clip = await this.clipsRepo.findOne({ where: { id: clipId }, relations: ['project'] });
      if (!clip) throw new Error('Clip not found');
      await this.updateJobStatus(clip.project.id, 'video.render-clip', 'processing');
      const input = clip.project.originalFilePath || clip.project.sourceUrl || '';
      const outputPath = await this.ffmpegService.renderClip(input, clip.startTime, clip.endTime, clip.aspectRatio);
      clip.outputFilePath = outputPath;
      await this.clipsRepo.save(clip);
      await this.updateJobStatus(clip.project.id, 'video.render-clip', 'completed');
    } catch (error: any) {
      this.logger.error(`Render failed: ${error.message}`);
      // best effort: attempt to map failure to a job entry if the clip still exists
      const clip = await this.clipsRepo.findOne({ where: { id: clipId }, relations: ['project'] });
      if (clip) {
        await this.updateJobStatus(clip.project.id, 'video.render-clip', 'failed', error.message);
      }
      throw error;
    }
  }
}
