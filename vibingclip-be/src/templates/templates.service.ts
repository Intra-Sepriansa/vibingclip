import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templatesRepo: Repository<Template>
  ) {}

  findAll(user: { sub: string }) {
    return this.templatesRepo.find({ where: { user: { id: user.sub } as any } });
  }

  create(user: { sub: string }, payload: { name: string; description?: string; configJson: string }) {
    const template = this.templatesRepo.create({ user: { id: user.sub } as any, ...payload });
    return this.templatesRepo.save(template);
  }
}
