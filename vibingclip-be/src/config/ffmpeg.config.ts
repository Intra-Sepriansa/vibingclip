import { ConfigService } from './config.service';

export const getFfmpegConfig = (config: ConfigService) => ({
  ffmpegPath: config.get('FFMPEG_PATH', 'ffmpeg')
});
