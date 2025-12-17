import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UploadsService } from './uploads.service';

const uploadDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: uploadDir,
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${uuid()}${ext}`);
        }
      })
    })
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    const project = await this.uploadsService.handleVideoUpload(file, user);
    return { project, uploadStatus: 'queued' };
  }
}
