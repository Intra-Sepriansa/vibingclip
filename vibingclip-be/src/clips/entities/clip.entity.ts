import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

export type AspectRatio = '9:16' | '1:1' | '16:9';

@Entity({ name: 'clips' })
export class Clip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.clips, { eager: true })
  project: Project;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column('integer')
  startTime: number;

  @Column('integer')
  endTime: number;

  @Column('integer')
  durationSeconds: number;

  @Column('integer')
  viralityScore: number;

  @Column('simple-json')
  tags: string[];

  @Column({ type: 'text', default: '9:16' })
  aspectRatio: AspectRatio;

  @Column({ type: 'text', nullable: true })
  outputFilePath?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
