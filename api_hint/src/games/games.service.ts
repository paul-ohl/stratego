import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ToggleReadyDto } from './dto/toggle-ready.dto';
import { PlayerStatus } from './enums/player-status.enum';
import { GameStatus } from './enums/game-status.enum';
import { MoveDto } from './dto/move.dto';
import { JoinGameDto } from './dto/join-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly data: Repository<Game>,
  ) {}

  async create(dto: CreateGameDto): Promise<Game> {
    try {
      let dto_enrichi = { ...dto, status: 'S' as GameStatus };
      let result = await this.data.save(dto_enrichi);
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

      let array_of_positons = JSON.parse(dto.positions);
      console.log('array_of_positons');
      console.log(array_of_positons);
      const somme = array_of_positons.reduce(
        (accumulateur, valeurCourante) =>
          accumulateur + (valeurCourante ? valeurCourante : 0),
        0,
      );
      console.log(somme);
      if (dto.color == 'red') {
        console.log('red');
        if (somme < 200) {
          find.status_player_red = 'C' as PlayerStatus;
          find.red_initial_positions = '[]';
        } else {
          find.status_player_red = 'R' as PlayerStatus;
          find.red_initial_positions = dto.positions;
        }
      } else {
        console.log('blue');
        if (somme < 200) {
          find.status_player_blue = 'C' as PlayerStatus;
          find.blue_initial_positions = '[]';
        } else {
          find.status_player_blue = 'R' as PlayerStatus;
          find.blue_initial_positions = dto.positions;
        }
      }

      if (
        find.status_player_red == 'R' &&
        find.status_player_blue == 'R' &&
        find.red_initial_positions != '[]' &&
        find.blue_initial_positions != '[]'
      ) {
        console.log('ready 2 ways');
        find.starting_date = new Date();
        find.status_player_red = 'P' as PlayerStatus;
        find.status_player_blue = 'W' as PlayerStatus;
        let red_positions = JSON.parse(find.red_initial_positions);
        let red_positions_objects = [];
        for (let i = 0; i < red_positions.length; i++) {
          let piece = { color: 'red', rank: red_positions[i], hidden: true };
          red_positions_objects.push(piece);
        }
        let blue_positions = JSON.parse(find.blue_initial_positions)
          .slice()
          .reverse();
        let blue_positions_objects = [];
        for (let i = 0; i < blue_positions.length; i++) {
          let piece = { color: 'blue', rank: blue_positions[i] };
          blue_positions_objects.push(piece);
        }
        let empty_field = new Array(20).fill(null); //
        let positions = blue_positions_objects
          .concat(empty_field)
          .concat(red_positions_objects);
        find.positions = JSON.stringify(positions);
      }
      console.log(find);
      let patch = {
        status_player_red: find.status_player_red,
        status_player_blue: find.status_player_blue,
        red_initial_positions: find.red_initial_positions,
        blue_initial_positions: find.blue_initial_positions,
        starting_date: find.starting_date,
        positions: find.positions,
      };

      await this.data.update(id, patch);
    } catch (e) {
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
    return this.findOne(id);
  }

  async move(id: number, dto: MoveDto): Promise<Game> {
    console.log(dto);
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
        console.log('piece_destination null');
        positions[destination] = piece_origine;
        positions[origine] = null;
        find.positions = JSON.stringify(positions);
        find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color}  avance`;
        await this.data.update(id, find);
      } else {
        if (piece_origine.color == piece_destination.color) {
          console.log('piece_destination color');
          throw new NotFoundException();
        }
        if (piece_origine.rank > piece_destination.rank) {
          console.log('piece_destination rank');
          positions[destination] = piece_origine;
          positions[origine] = null;
          find.positions = JSON.stringify(positions);
          find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color} a mangé la piece ${piece_destination.color} ${piece_destination.rank}`;
          await this.data.update(id, find);
        } else {
          console.log('piece_destination rank');
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

  findSetupGames(): Promise<Game[]> {
    return this.data.find({ where: { status: GameStatus.SETUP } });
  }

  async findOne(id: number, color: string = ''): Promise<Game> {
    const found = await this.data.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    if (color) {
      let positions = JSON.parse(found.positions);
      let positions_filtered = [];
      for (let i = 0; i < positions.length; i++) {
        let piece = positions[i];
        if ((piece && piece.color == color) || piece?.hidden == false) {
          positions_filtered.push(piece);
        } else {
          if (piece) {
            piece.rank = '';
          }
          positions_filtered.push(piece);
        }
      }
      found.positions = JSON.stringify(positions_filtered);
    }
    return found;
  }

  async joinGame(id: number, dto: JoinGameDto): Promise<Game> {
    try {
      let done = await this.data.update(id, dto);
      // if (done.affected != 1) {
      //   throw new NotFoundException();
      // }
    } catch (e) {
      console.log(e);
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
    return this.findOne(id);
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
