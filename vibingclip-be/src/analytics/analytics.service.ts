import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  overview() {
    return {
      projects: 12,
      clips: 58,
      avgVirality: 74,
      processing: 3
    };
  }

  projects() {
    return [{ id: 'p1', title: 'Sample Project', clips: 5, virality: 82 }];
  }

  clips() {
    return [{ id: 'c1', title: 'Hook about discipline', virality: 88 }];
  }
}
