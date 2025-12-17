export type TimeRange = '7d' | '30d' | '90d';

export interface SummaryMetric {
  label: string;
  value: string;
  delta?: number;
  helperText?: string;
}

export interface TrendPoint {
  label: string;
  views: number;
  watchTimeHours: number;
}

export interface PlatformPerformance {
  platform: 'youtube' | 'tiktok' | 'instagram' | 'other';
  views: number;
  watchTimeHours: number;
  avgRetention: number;
  clickThroughRate: number;
  conversionRate: number;
}

export interface TopProject {
  id: string;
  title: string;
  platform: string;
  views: number;
  watchTimeHours: number;
  viralityScore: number;
  avgRetention: number;
}

export interface TopClip {
  id: string;
  title: string;
  projectTitle: string;
  platform: string;
  views: number;
  viralityScore: number;
  completionRate: number;
}

export interface AudienceSegment {
  label: string;
  value: number;
  delta?: number;
}

export interface AudienceBreakdown {
  ageGroups: AudienceSegment[];
  regions: AudienceSegment[];
  devices: AudienceSegment[];
  primeTime: string;
}

export interface AnalyticsData {
  summary: SummaryMetric[];
  trends: TrendPoint[];
  platformPerformance: PlatformPerformance[];
  topProjects: TopProject[];
  topClips: TopClip[];
  audience: AudienceBreakdown;
}
