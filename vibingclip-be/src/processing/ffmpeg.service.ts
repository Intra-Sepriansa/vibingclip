import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '../config/config.service';

interface MetadataResult {
  durationSeconds: number;
}

@Injectable()
export class FfmpegService {
  private readonly logger = new Logger(FfmpegService.name);
  private readonly ffmpegPath: string;

  constructor(private readonly configService: ConfigService) {
    this.ffmpegPath = this.configService.get('FFMPEG_PATH', 'ffmpeg');
  }

  getMetadata(filePath: string): Promise<MetadataResult> {
    return new Promise((resolve) => {
      exec(`${this.ffmpegPath} -i "${filePath}" 2>&1`, (error, stdout, stderr) => {
        const output = stdout + stderr;
        const match = output.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
        if (match) {
          const hours = parseInt(match[1], 10);
          const minutes = parseInt(match[2], 10);
          const seconds = parseFloat(match[3]);
          const totalSeconds = Math.floor(hours * 3600 + minutes * 60 + seconds);
          resolve({ durationSeconds: totalSeconds });
        } else {
          this.logger.warn('Could not parse duration, defaulting to 120s');
          resolve({ durationSeconds: 120 });
        }
      });
    });
  }

  async renderClip(inputPath: string, start: number, end: number, aspect: string): Promise<string> {
    const outputDir = path.resolve(process.cwd(), 'renders');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, `${path.basename(inputPath, path.extname(inputPath))}-${start}-${end}-${aspect}.mp4`);
    // For brevity, we mock rendering by touching the file; replace with real ffmpeg command in prod.
    fs.writeFileSync(outputPath, 'rendered');
    return outputPath;
  }
}
