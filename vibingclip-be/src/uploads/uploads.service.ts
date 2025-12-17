import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { ProcessingService } from '../processing/processing.service';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    private readonly processingService: ProcessingService
  ) {}

  async handleVideoUpload(file: Express.Multer.File, user: { sub: string }) {
    const owner = { id: user.sub } as any;
    const project = this.projectsRepo.create({
      title: file.originalname,
      platform: 'other',
      sourceType: 'upload',
      originalFilePath: file.path,
      status: 'pending',
      user: owner
    });
    const saved = await this.projectsRepo.save(project);
    await this.processingService.enqueueProjectIngest(saved.id);
    return saved;
  }
}
