import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Template } from '../../templates/entities/template.entity';
import { BrandProfile } from '../../branding/entities/brand-profile.entity';
import { ActivityLog } from '../../analytics/entities/activity-log.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  // Explicit column type prevents "Object" inference in SQLite
  @Column({ type: 'varchar', length: 512, nullable: true, default: null })
  avatarUrl?: string | null;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Template, (template) => template.user)
  templates: Template[];

  @OneToMany(() => BrandProfile, (brand) => brand.user)
  brandProfiles: BrandProfile[];

  @OneToMany(() => ActivityLog, (activity) => activity.user)
  activities: ActivityLog[];
}
