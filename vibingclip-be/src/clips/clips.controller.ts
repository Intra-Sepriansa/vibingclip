import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { UpdateClipDto } from './dto/update-clip.dto';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clipsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClipDto) {
    return this.clipsService.update(id, dto);
  }

  @Post(':id/render')
  render(@Param('id') id: string) {
    return this.clipsService.render(id);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id') id: string) {
    return this.clipsService.duplicate(id);
  }
}
