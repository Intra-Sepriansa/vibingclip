import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { Clip } from '../clips/entities/clip.entity';
import { ProcessingJob, ProcessingJobType } from './entities/processing-job.entity';

@Injectable()
export class ProcessingService {
  constructor(
    @InjectQueue('video-processing') private readonly queue: Queue,
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    @InjectRepository(ProcessingJob)
    private readonly jobsRepo: Repository<ProcessingJob>,
    @InjectRepository(Clip)
    private readonly clipsRepo: Repository<Clip>
  ) {}

  private async createJob(project: Project, type: ProcessingJobType) {
    const job = this.jobsRepo.create({ project, type, status: 'queued' });
    await this.jobsRepo.save(job);
  }

  async enqueueProjectIngest(projectId: string) {
    const project = await this.projectsRepo.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    await this.createJob(project, 'project.ingest');
    await this.queue.add('project.ingest', { projectId });
  }

  async enqueueClipRender(clipId: string) {
    const clip = await this.clipsRepo.findOne({ where: { id: clipId }, relations: ['project'] });
    if (!clip) throw new NotFoundException('Clip not found');
    await this.createJob(clip.project, 'video.render-clip');
    await this.queue.add('video.render-clip', { clipId });
  }

  async enqueueNext(projectId: string, type: ProcessingJobType, data: Record<string, any> = {}) {
    const project = await this.projectsRepo.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    await this.createJob(project, type);
    await this.queue.add(type, { projectId, ...data });
  }
}
