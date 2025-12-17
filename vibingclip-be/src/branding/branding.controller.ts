import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { BrandingService } from './branding.service';

@Controller('branding')
export class BrandingController {
  constructor(private readonly brandingService: BrandingService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.brandingService.findAll(user);
  }

  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.brandingService.create(user, body);
  }
}
