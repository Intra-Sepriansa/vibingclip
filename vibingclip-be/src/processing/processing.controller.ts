import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Controller('processing')
export class ProcessingController {
  constructor(@InjectQueue('video-processing') private readonly queue: Queue) {}

  @Get('status')
  async status() {
    const counts = await this.queue.getJobCounts();
    return { queue: 'video-processing', counts };
  }
}
