import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiBridgeModule } from '../ai-bridge/ai-bridge.module';
import { Clip } from '../clips/entities/clip.entity';
import { Project } from '../projects/entities/project.entity';
import { ProcessingJob } from './entities/processing-job.entity';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';
import { FfmpegService } from './ffmpeg.service';
import { VideoProcessingProcessor } from './processors/video-processors';
import { LinkDownloaderService } from './link-downloader.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'video-processing' }),
    TypeOrmModule.forFeature([Project, Clip, ProcessingJob]),
    AiBridgeModule
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService, FfmpegService, VideoProcessingProcessor, LinkDownloaderService],
  exports: [ProcessingService]
})
export class ProcessingModule {}
