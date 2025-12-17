import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandingController } from './branding.controller';
import { BrandingService } from './branding.service';
import { BrandProfile } from './entities/brand-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandProfile])],
  controllers: [BrandingController],
  providers: [BrandingService]
})
export class BrandingModule {}
