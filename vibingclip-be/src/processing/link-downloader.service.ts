import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '../config/config.service';

const execAsync = promisify(exec);

@Injectable()
export class LinkDownloaderService {
  private readonly logger = new Logger(LinkDownloaderService.name);
  private readonly ytDlpPath: string;
  private readonly downloadDir: string;

  constructor(private readonly configService: ConfigService) {
    this.ytDlpPath = this.configService.get('YT_DLP_PATH', 'yt-dlp');
    this.downloadDir = path.resolve(process.cwd(), this.configService.get('DOWNLOAD_DIR', 'downloads'));
  }

  private async ensureBinary() {
    try {
      const bin = this.ytDlpPath.includes(' ') ? `"${this.ytDlpPath}"` : this.ytDlpPath;
      await execAsync(`${bin} --version`);
    } catch (error) {
      this.logger.error('yt-dlp not found. Install it: pip install yt-dlp');
      throw new Error('yt-dlp binary is required to download links');
    }
  }

  async download(url: string, projectId: string): Promise<string> {
    if (!url) throw new Error('Source URL is required for link ingestion');
    await this.ensureBinary();
    await fs.promises.mkdir(this.downloadDir, { recursive: true });

    const outputTemplate = path.join(this.downloadDir, `${projectId}.%(ext)s`);
    const bin = this.ytDlpPath.includes(' ') ? `"${this.ytDlpPath}"` : this.ytDlpPath;
    const command = `${bin} -f mp4 -o "${outputTemplate}" "${url}"`;

    this.logger.log(`Downloading source from ${url}`);
    await execAsync(command);

    const files = await fs.promises.readdir(this.downloadDir);
    const downloaded = files.find((file) => file.startsWith(`${projectId}.`));
    if (!downloaded) {
      throw new Error('Download finished but no file found');
    }
    return path.join(this.downloadDir, downloaded);
  }
}
