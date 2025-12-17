import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessingModule } from '../processing/processing.module';
import { Project } from '../projects/entities/project.entity';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ProcessingModule],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
