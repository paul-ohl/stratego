import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ToggleReadyDto } from './dto/toggle-ready.dto';
import { MoveDto } from './dto/move.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Post(':id/toggle-ready')
  toggleReady(@Param('id') id: string, @Body() toggleReadyDto: ToggleReadyDto) {
    console.log('toggleReadyDto');
    console.log(toggleReadyDto);
    return this.gamesService.toggleReady(+id, toggleReadyDto);
  }

  @Post(':id/move')
  move(@Param('id') id: string, @Body() moveDto: MoveDto) {
    return this.gamesService.move(+id, moveDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('/setup')
  findSetupGames() {
    return this.gamesService.findSetupGames();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('color') color: string) {
    return this.gamesService.findOne(+id, color ? color : null);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
