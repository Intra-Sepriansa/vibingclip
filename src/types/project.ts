export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'podcast' | 'other';

export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type SourceType = 'upload' | 'link';

export type ViralityScore = number;

export interface Clip {
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  viralityScore: ViralityScore;
  tags: string[];
  aspectRatio: '9:16' | '1:1' | '16:9';
  outputFilePath?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string | null;
  platform: Platform;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  sourceType: SourceType;
  sourceUrl?: string | null;
  originalFilePath?: string | null;
  durationSeconds?: number | null;
  status: ProcessingStatus;
  createdAt: string;
  updatedAt?: string;
  clips: Clip[];
}
