import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Clip } from '../clips/entities/clip.entity';
import { ProcessingJob } from '../processing/entities/processing-job.entity';
import { ProcessingService } from '../processing/processing.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    @InjectRepository(Clip)
    private readonly clipsRepo: Repository<Clip>,
    @InjectRepository(ProcessingJob)
    private readonly jobsRepo: Repository<ProcessingJob>,
    private readonly processingService: ProcessingService
  ) {}

  async findAll(query: PaginationDto, status?: string, platform?: string) {
    const { page = 1, limit = 20 } = query;
    const where: FindOptionsWhere<Project> = {};
    if (status) where.status = status as any;
    if (platform) where.platform = platform as any;
    const [items, total] = await this.projectsRepo.findAndCount({
      where: Object.keys(where).length ? where : undefined,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit
    });
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const project = await this.projectsRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async createFromLink(dto: CreateProjectDto, user: { sub: string }) {
    const owner = { id: user.sub } as any;
    const project = this.projectsRepo.create({
      ...dto,
      status: 'pending',
      user: owner
    });
    const saved = await this.projectsRepo.save(project);
    await this.processingService.enqueueProjectIngest(saved.id);
    return saved;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.projectsRepo.save(project);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.projectsRepo.remove(project);
    return { deleted: true };
  }

  async findClips(projectId: string) {
    return this.clipsRepo.find({ where: { project: { id: projectId } } });
  }

  async getStatus(projectId: string) {
    const project = await this.findOne(projectId);
    const steps = await this.jobsRepo.find({ where: { project: { id: projectId } } });
    const completed = steps.filter((s) => s.status === 'completed').length;
    const progress = steps.length ? Math.round((completed / steps.length) * 100) : 0;
    return { status: project.status, steps, progress };
  }
}
