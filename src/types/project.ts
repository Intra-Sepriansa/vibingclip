export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'podcast' | 'other';

export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type ViralityScore = number;

export interface Clip {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  viralityScore: ViralityScore;
  tags: string[];
  aspectRatio: '9:16' | '1:1' | '16:9';
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  platform: Platform;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  status: ProcessingStatus;
  createdAt: string;
  clips: Clip[];
}
