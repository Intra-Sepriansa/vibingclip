import { AnalyticsData } from '../types/analytics';

export const analyticsData: AnalyticsData = {
  summary: [
    { label: 'Total views', value: '1.2M', delta: 12.4 },
    { label: 'Watch time', value: '41.3k hrs', delta: 8.2 },
    { label: 'Avg retention', value: '58%', delta: 5.1 },
    { label: 'Conversion', value: '3.4%', delta: -0.3 }
  ],
  trends: [
    { label: 'Mon', views: 120_000, watchTimeHours: 4_200 },
    { label: 'Tue', views: 141_000, watchTimeHours: 4_900 },
    { label: 'Wed', views: 158_000, watchTimeHours: 5_200 },
    { label: 'Thu', views: 171_000, watchTimeHours: 5_500 },
    { label: 'Fri', views: 201_000, watchTimeHours: 6_200 },
    { label: 'Sat', views: 215_000, watchTimeHours: 6_600 },
    { label: 'Sun', views: 195_000, watchTimeHours: 6_100 }
  ],
  platformPerformance: [
    {
      platform: 'youtube',
      views: 680_000,
      watchTimeHours: 22_500,
      avgRetention: 62,
      clickThroughRate: 5.4,
      conversionRate: 3.9
    },
    {
      platform: 'tiktok',
      views: 340_000,
      watchTimeHours: 12_400,
      avgRetention: 54,
      clickThroughRate: 7.8,
      conversionRate: 2.1
    },
    {
      platform: 'instagram',
      views: 180_000,
      watchTimeHours: 6_400,
      avgRetention: 49,
      clickThroughRate: 4.1,
      conversionRate: 1.8
    }
  ],
  topProjects: [
    {
      id: 'p1',
      title: 'Build Discipline with Small Wins – Full Podcast Episode',
      platform: 'youtube',
      views: 320_000,
      watchTimeHours: 11_200,
      viralityScore: 88,
      avgRetention: 63
    },
    {
      id: 'p2',
      title: 'Turn One Idea into 10 TikToks (Live Workshop)',
      platform: 'tiktok',
      views: 215_000,
      watchTimeHours: 7_600,
      viralityScore: 79,
      avgRetention: 55
    },
    {
      id: 'p3',
      title: 'Daily Vlog #44 – New Camera Test',
      platform: 'youtube',
      views: 168_000,
      watchTimeHours: 5_900,
      viralityScore: 64,
      avgRetention: 47
    }
  ],
  topClips: [
    {
      id: 'c1',
      title: 'Discipline is a muscle you build daily',
      projectTitle: 'Build Discipline with Small Wins',
      platform: 'youtube',
      views: 142_000,
      viralityScore: 92,
      completionRate: 76
    },
    {
      id: 'c6',
      title: 'Hook options that stop the scroll',
      projectTitle: 'Turn One Idea into 10 TikToks',
      platform: 'tiktok',
      views: 126_000,
      viralityScore: 84,
      completionRate: 68
    },
    {
      id: 'c10',
      title: 'Quick tip on shutter speed for vloggers',
      projectTitle: 'Daily Vlog #44',
      platform: 'youtube',
      views: 98_500,
      viralityScore: 73,
      completionRate: 62
    }
  ],
  audience: {
    ageGroups: [
      { label: '18–24', value: 35, delta: 2 },
      { label: '25–34', value: 41, delta: 1 },
      { label: '35–44', value: 15, delta: -1 },
      { label: '45+', value: 9, delta: 0 }
    ],
    regions: [
      { label: 'North America', value: 42 },
      { label: 'Europe', value: 31 },
      { label: 'APAC', value: 19 },
      { label: 'Other', value: 8 }
    ],
    devices: [
      { label: 'Mobile', value: 76 },
      { label: 'Desktop', value: 18 },
      { label: 'Tablet', value: 6 }
    ],
    primeTime: '6pm – 10pm (viewer local time)'
  }
};
