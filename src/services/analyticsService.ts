import { analyticsData } from '../mocks/analytics';
import { AnalyticsData, TimeRange } from '../types/analytics';

export const analyticsService = {
  async fetch(range: TimeRange = '30d'): Promise<AnalyticsData> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 120));
    return analyticsData;
  }
};
