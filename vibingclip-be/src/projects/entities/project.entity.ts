import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Clip } from '../../clips/entities/clip.entity';
import { ProcessingJob } from '../../processing/entities/processing-job.entity';

export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'podcast' | 'other';
export type SourceType = 'upload' | 'link';
export type ProjectStatus = 'pending' | 'processing' | 'completed' | 'failed';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.projects, { eager: true })
  user: User;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'text', default: 'other' })
  platform: Platform;

  @Column({ type: 'text', default: 'upload' })
  sourceType: SourceType;

  @Column({ type: 'text', nullable: true })
  sourceUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  originalFilePath?: string | null;

  @Column({ type: 'integer', nullable: true })
  durationSeconds?: number | null;

  @Column({ type: 'text', default: 'pending' })
  status: ProjectStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Clip, (clip) => clip.project)
  clips: Clip[];

  @OneToMany(() => ProcessingJob, (job) => job.project)
  jobs: ProcessingJob[];
}
