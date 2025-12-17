import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clip } from '../clips/entities/clip.entity';
import { ProcessingJob } from '../processing/entities/processing-job.entity';
import { ProcessingModule } from '../processing/processing.module';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Clip, ProcessingJob]), ProcessingModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
