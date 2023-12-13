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
import { JoinGameDto } from './dto/join-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    // TODO: Fix this, it is probably an error in the front-end
    if (createGameDto.player_red_name == null) {
      createGameDto.player_red_name = "RED_PLAYER";
    }
    return this.gamesService.create(createGameDto);
  }

  @Post(':id/toggle-ready')
  toggleReady(@Param('id') id: string, @Body() toggleReadyDto: ToggleReadyDto) {
    console.log('toggleReadyDto');
    console.log(toggleReadyDto);
    return this.gamesService.toggleReady(+id, toggleReadyDto);
  }

  @Post(':id/join')
  joinGame(@Param('id') id: string, @Body() joinGameDto: JoinGameDto) {
    // TODO: Use the joinGameDto, make it work!
    if (joinGameDto.player_blue_name == null) {
      joinGameDto.player_blue_name = "BLUE_PLAYER";
    }
    return this.gamesService.joinGame(+id, joinGameDto);
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
