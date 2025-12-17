import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  overview() {
    return this.analyticsService.overview();
  }

  @Get('projects')
  projects() {
    return this.analyticsService.projects();
  }

  @Get('clips')
  clips() {
    return this.analyticsService.clips();
  }
}
