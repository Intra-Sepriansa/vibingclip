import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

@Injectable()
export class ConfigService {
  private readonly env: Record<string, string>;

  constructor() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const parsed = dotenv.parse(fs.readFileSync(envPath));
      this.env = { ...process.env, ...parsed } as Record<string, string>;
    } else {
      this.env = process.env as Record<string, string>;
    }
  }

  get<T extends string | number | boolean = string>(key: string, defaultValue?: T): T {
    const value = this.env[key];
    if (value === undefined) {
      return defaultValue as T;
    }
    return value as unknown as T;
  }
}
