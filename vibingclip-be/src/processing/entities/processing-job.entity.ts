import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

export type ProcessingJobType =
  | 'project.ingest'
  | 'video.download'
  | 'video.extract-metadata'
  | 'video.transcribe'
  | 'video.analyze'
  | 'video.render-clip';

export type ProcessingJobStatus = 'queued' | 'processing' | 'completed' | 'failed';

@Entity({ name: 'processing_jobs' })
export class ProcessingJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.jobs, { eager: true })
  project: Project;

  @Column({ type: 'text' })
  type: ProcessingJobType;

  @Column({ type: 'text', default: 'queued' })
  status: ProcessingJobStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
