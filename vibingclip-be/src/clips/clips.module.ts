import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { ProcessingModule } from '../processing/processing.module';
import { Clip } from './entities/clip.entity';
import { ClipsController } from './clips.controller';
import { ClipsService } from './clips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clip]), ProjectsModule, ProcessingModule],
  controllers: [ClipsController],
  providers: [ClipsService],
  exports: [ClipsService]
})
export class ClipsModule {}
