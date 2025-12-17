import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { Platform, SourceType } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['youtube', 'tiktok', 'instagram', 'podcast', 'other'], {
    message: 'platform must be youtube | tiktok | instagram | podcast | other'
  })
  platform: Platform;

  @IsIn(['upload', 'link'], { message: 'sourceType must be upload | link' })
  sourceType: SourceType;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  sourceUrl?: string;
}
