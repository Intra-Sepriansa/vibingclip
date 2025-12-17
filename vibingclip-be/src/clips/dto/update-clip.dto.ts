import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { AspectRatio } from '../entities/clip.entity';

export class UpdateClipDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(['9:16', '1:1', '16:9'], { message: 'aspectRatio must be 9:16, 1:1, or 16:9' })
  aspectRatio?: AspectRatio;
}
