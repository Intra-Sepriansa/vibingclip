import { ConfigService } from './config.service';

export const getAiConfig = (config: ConfigService) => ({
  baseUrl: config.get('AI_SERVICE_BASE_URL', 'http://localhost:5001')
});
