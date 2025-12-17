import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { Clip } from '../../clips/entities/clip.entity';

@Entity({ name: 'activity_logs' })
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.activities, { eager: true })
  user: User;

  @ManyToOne(() => Project, { nullable: true })
  project?: Project | null;

  @ManyToOne(() => Clip, { nullable: true })
  clip?: Clip | null;

  @Column()
  actionType: string;

  @Column({ type: 'text' })
  metadataJson: string;

  @CreateDateColumn()
  createdAt: Date;
}
