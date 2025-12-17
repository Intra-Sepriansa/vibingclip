import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'brand_profiles' })
export class BrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.brandProfiles, { eager: true })
  user: User;

  @Column()
  brandName: string;

  @Column()
  primaryColor: string;

  @Column({ type: 'text', nullable: true, default: null })
  secondaryColor?: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true, default: null })
  logoUrl?: string | null;

  @Column({ type: 'simple-json', nullable: true })
  watermarkConfigJson?: Record<string, any> | null;

  @CreateDateColumn()
  createdAt: Date;
}
