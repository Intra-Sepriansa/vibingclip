import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  find() {
    return {
      autoRender: true,
      notifyOnComplete: true,
      defaultAspectRatio: '9:16'
    };
  }
}
