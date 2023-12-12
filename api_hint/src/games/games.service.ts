import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ToggleReadyDto } from './dto/toggle-ready.dto';
import { PlayerStatus } from './enums/player-status.enum';
import { MoveDto } from './dto/move.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly data: Repository<Game>,
  ) {}

  async create(dto: CreateGameDto): Promise<Game> {
    try {
      let result = await this.data.save(dto);
      return result;
    } catch (e) {
      throw new ConflictException();
    }
  }

  async toggleReady(id: number, dto: ToggleReadyDto): Promise<Game> {
    try {
      console.log(dto);
      let find = await this.data.findOneBy({ id });
      if (!find) {
        throw new NotFoundException();
      }
      if (dto.color == 'red') {
        console.log('red');
        find.status_player_red = 'R' as PlayerStatus;
        find.red_initial_positions = dto.positions;
      } else {
        console.log('blue');
        find.status_player_blue = 'R' as PlayerStatus;
        find.blue_initial_positions = dto.positions;
      }

      if (
        find.status_player_red == 'R' &&
        find.status_player_blue == 'R' &&
        find.red_initial_positions &&
        find.blue_initial_positions
      ) {
        console.log('ready 2 ways');
        find.status_player_red = 'P' as PlayerStatus;
        find.status_player_blue = 'W' as PlayerStatus;
        let red_positions = JSON.parse(find.red_initial_positions);
        let blue_positions = JSON.parse(find.blue_initial_positions)
          .slice()
          .reverse();
        let empty_field = new Array(20).fill(null); //
        let positions = blue_positions
          .concat(empty_field)
          .concat(red_positions);
        find.positions = JSON.stringify(positions);
      }
      console.log(find);
      await this.data.update(id, find);
    } catch (e) {
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
    return this.findOne(id);
  }

  async move(id: number, dto: MoveDto): Promise<Game> {
    try {
      let find = await this.data.findOneBy({ id });
      if (!find) {
        throw new NotFoundException();
      }
      let positions = JSON.parse(find.positions);
      let origine = dto.origine;
      let destination = dto.destination;
      let piece_origine = positions[origine];
      let piece_destination = positions[destination];
      if (!piece_origine) {
        throw new NotFoundException();
      }
      if (!piece_destination) {
        positions[destination] = piece_origine;
        positions[origine] = null;
        find.positions = JSON.stringify(positions);
        find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color}  avance`;
        await this.data.update(id, find);
      } else {
        if (piece_origine.color == piece_destination.color) {
          throw new NotFoundException();
        }
        if (piece_origine.rank > piece_destination.rank) {
          positions[destination] = piece_origine;
          positions[origine] = null;
          find.positions = JSON.stringify(positions);
          find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color} a mangé la piece ${piece_destination.color} ${piece_destination.rank}`;
          await this.data.update(id, find);
        } else {
          positions[origine] = null;
          find.positions = JSON.stringify(positions);
          find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color} a été mangé par la piece ${piece_destination.color} ${piece_destination.rank}`;
          await this.data.update(id, find);
        }
      }

      return await this.data.findOneBy({ id });
    } catch (e) {
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
  }

  findAll(): Promise<Game[]> {
    return this.data.find();
  }

  async findOne(id: number): Promise<Game> {
    const found = await this.data.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(id: number, dto: UpdateGameDto): Promise<Game> {
    try {
      let done = await this.data.update(id, dto);
      if (done.affected != 1) {
        throw new NotFoundException();
      }
    } catch (e) {
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    let done = await this.data.delete(id);
    if (done.affected != 1) {
      throw new NotFoundException();
    }
  }
}
