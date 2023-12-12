import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HintService } from './hint.service';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';

@Controller('hint')
export class HintController {
  constructor(private readonly hintService: HintService) {}

  @Post()
  create(@Body() createHintDto: CreateHintDto) {
    return this.hintService.create(createHintDto);
  }

  @Get()
  findAll() {
    return this.hintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hintService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHintDto: UpdateHintDto) {
    return this.hintService.update(+id, updateHintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hintService.remove(+id);
  }
}
