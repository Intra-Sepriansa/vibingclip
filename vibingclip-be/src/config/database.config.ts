import { ConfigService } from './config.service';

export const getDatabaseConfig = (config: ConfigService) => ({
  type: 'sqlite' as const,
  database: config.get('DATABASE_URL', 'vibingclip.db')
});
