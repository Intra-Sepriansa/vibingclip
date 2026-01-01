import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - ffmpeg-static has no default types
import ffmpegStatic from 'ffmpeg-static';
import { ConfigService } from '../config/config.service';

interface MetadataResult {
  durationSeconds: number;
}

const execAsync = promisify(exec);

@Injectable()
export class FfmpegService {
  private readonly logger = new Logger(FfmpegService.name);
  private readonly ffmpegPath: string;
  private readonly rendersDir: string;
  private readonly audioDir: string;

  constructor(private readonly configService: ConfigService) {
    this.ffmpegPath =
      this.configService.get('FFMPEG_PATH', '') || ffmpegStatic || 'ffmpeg';
    this.rendersDir = path.resolve(process.cwd(), this.configService.get('RENDERS_DIR', 'renders'));
    this.audioDir = path.resolve(process.cwd(), this.configService.get('AUDIO_CACHE_DIR', 'audio-cache'));
  }

  getMetadata(filePath: string): Promise<MetadataResult> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        return reject(new Error(`Media file not found: ${filePath}`));
      }
      const bin = `"${this.ffmpegPath}"`;
      exec(`${bin} -i "${filePath}" 2>&1`, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        const output = stdout + stderr;
        const match = output.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
        if (match) {
          const hours = parseInt(match[1], 10);
          const minutes = parseInt(match[2], 10);
          const seconds = parseFloat(match[3]);
          const totalSeconds = Math.floor(hours * 3600 + minutes * 60 + seconds);
          return resolve({ durationSeconds: totalSeconds });
        }
        return reject(new Error('Could not parse duration from media'));
      });
    });
  }

  async extractAudio(inputPath: string, projectId: string): Promise<string> {
    await fs.promises.mkdir(this.audioDir, { recursive: true });
    const outputPath = path.join(this.audioDir, `${path.basename(projectId || inputPath)}.wav`);
    const bin = `"${this.ffmpegPath}"`;
    const command = `${bin} -y -i "${inputPath}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "${outputPath}"`;
    await execAsync(command);
    return outputPath;
  }

  async renderClip(inputPath: string, start: number, end: number, aspect: string): Promise<string> {
    await fs.promises.mkdir(this.rendersDir, { recursive: true });
    const safeAspect = aspect || '9:16';
    const outputPath = path.join(
      this.rendersDir,
      `${path.basename(inputPath, path.extname(inputPath))}-${start}-${end}-${safeAspect}.mp4`
    );

    const vf =
      safeAspect === '1:1'
          ? 'scale=1080:-2,crop=1080:1080'
          : safeAspect === '16:9'
            ? 'scale=1920:-2'
            : 'scale=1080:-2,crop=1080:1920';

    const bin = `"${this.ffmpegPath}"`;
    const command = `${bin} -y -ss ${start} -to ${end} -i "${inputPath}" -vf "${vf}" -c:v libx264 -preset veryfast -c:a aac -shortest "${outputPath}"`;
    this.logger.log(`Rendering clip: ${command}`);
    await execAsync(command);
    return outputPath;
  }
}
