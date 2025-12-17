import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { ProcessingService } from '../processing/processing.service';
import { Clip } from './entities/clip.entity';
import { UpdateClipDto } from './dto/update-clip.dto';

@Injectable()
export class ClipsService {
  constructor(
    @InjectRepository(Clip)
    private readonly clipsRepo: Repository<Clip>,
    private readonly processingService: ProcessingService,
    private readonly projectsService: ProjectsService
  ) {}

  async findOne(id: string) {
    const clip = await this.clipsRepo.findOne({ where: { id } });
    if (!clip) throw new NotFoundException('Clip not found');
    return clip;
  }

  async update(id: string, dto: UpdateClipDto) {
    const clip = await this.findOne(id);
    Object.assign(clip, dto);
    return this.clipsRepo.save(clip);
  }

  async render(id: string) {
    await this.findOne(id);
    await this.processingService.enqueueClipRender(id);
    return { queued: true };
  }

  async duplicate(id: string) {
    const clip = await this.findOne(id);
    const project = await this.projectsService.findOne(clip.project.id);
    const copy = this.clipsRepo.create({
      ...clip,
      id: undefined,
      project,
      title: `${clip.title} (copy)`
    });
    return this.clipsRepo.save(copy);
  }
}
