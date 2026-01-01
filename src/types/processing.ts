export type ProcessingJobType =
  | 'project.ingest'
  | 'video.download'
  | 'video.extract-metadata'
  | 'video.transcribe'
  | 'video.analyze'
  | 'video.render-clip';

export type ProcessingJobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ProcessingJob {
  id: string;
  projectId: string;
  type: ProcessingJobType;
  status: ProcessingJobStatus;
  errorMessage?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStatusResponse {
  status: string;
  steps: ProcessingJob[];
  progress: number;
}
