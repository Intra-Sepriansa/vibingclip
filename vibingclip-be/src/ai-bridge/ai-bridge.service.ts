import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { SuggestedClip } from './dto/suggested-clip.dto';

@Injectable()
export class AiBridgeService {
  private readonly logger = new Logger(AiBridgeService.name);
  private readonly baseUrl: string;

  constructor(private readonly http: HttpService, private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get('AI_SERVICE_BASE_URL', 'http://localhost:5001');
  }

  async transcribeAudio(audioFilePath: string): Promise<{ transcript: string; language: string }> {
    try {
      const { data } = await firstValueFrom(
        this.http.post(`${this.baseUrl}/api/v1/transcribe`, { filePath: audioFilePath })
      );
      return data;
    } catch (error: any) {
      this.logger.error(`AI transcribe failed: ${error.message}`);
      throw new HttpException('AI service unavailable for transcription', 502);
    }
  }

  async suggestClipsFromTranscript(args: {
    transcript: string;
    durationSeconds: number;
    language?: string;
    maxClips?: number;
  }): Promise<SuggestedClip[]> {
    try {
      const { data } = await firstValueFrom(
        this.http.post(`${this.baseUrl}/api/v1/analyze/transcript`, args)
      );
      return data.clips as SuggestedClip[];
    } catch (error: any) {
      this.logger.error(`AI analyze failed: ${error.message}`);
      throw new HttpException('AI service unavailable for analysis', 502);
    }
  }
}
