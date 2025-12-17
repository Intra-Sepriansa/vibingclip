import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ClipsModule } from './clips/clips.module';
import { UploadsModule } from './uploads/uploads.module';
import { ProcessingModule } from './processing/processing.module';
import { AiBridgeModule } from './ai-bridge/ai-bridge.module';
import { TemplatesModule } from './templates/templates.module';
import { BrandingModule } from './branding/branding.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SettingsModule } from './settings/settings.module';
import { HealthModule } from './health/health.module';
import { User } from './users/entities/user.entity';
import { Project } from './projects/entities/project.entity';
import { Clip } from './clips/entities/clip.entity';
import { ProcessingJob } from './processing/entities/processing-job.entity';
import { Template } from './templates/entities/template.entity';
import { BrandProfile } from './branding/entities/brand-profile.entity';
import { ActivityLog } from './analytics/entities/activity-log.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get('DATABASE_URL', 'vibingclip.db'),
        entities: [User, Project, Clip, ProcessingJob, Template, BrandProfile, ActivityLog],
        synchronize: true,
        logging: false
      })
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: Number(config.get('REDIS_PORT', 6379))
        }
      })
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    ClipsModule,
    UploadsModule,
    ProcessingModule,
    AiBridgeModule,
    TemplatesModule,
    BrandingModule,
    AnalyticsModule,
    SettingsModule,
    HealthModule
  ]
})
export class AppModule {}
