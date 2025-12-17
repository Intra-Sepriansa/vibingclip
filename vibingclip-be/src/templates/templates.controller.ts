import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.templatesService.findAll(user);
  }

  @Post()
  create(
    @Body() body: { name: string; description?: string; configJson: string },
    @CurrentUser() user: any
  ) {
    return this.templatesService.create(user, body);
  }
}
