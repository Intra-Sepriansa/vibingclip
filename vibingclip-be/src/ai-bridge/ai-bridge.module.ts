import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../config/config.module';
import { AiBridgeService } from './ai-bridge.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [AiBridgeService],
  exports: [AiBridgeService]
})
export class AiBridgeModule {}
