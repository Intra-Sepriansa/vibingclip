import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandProfile } from './entities/brand-profile.entity';

@Injectable()
export class BrandingService {
  constructor(
    @InjectRepository(BrandProfile)
    private readonly brandingRepo: Repository<BrandProfile>
  ) {}

  findAll(user: { sub: string }) {
    return this.brandingRepo.find({ where: { user: { id: user.sub } as any } });
  }

  create(user: { sub: string }, data: Partial<BrandProfile>) {
    const profile = this.brandingRepo.create({ ...data, user: { id: user.sub } as any });
    return this.brandingRepo.save(profile);
  }
}
