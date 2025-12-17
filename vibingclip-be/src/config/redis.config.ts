import { ConfigService } from './config.service';

export const getRedisConfig = (config: ConfigService) => ({
  host: config.get('REDIS_HOST', 'localhost'),
  port: Number(config.get('REDIS_PORT', 6379))
});
