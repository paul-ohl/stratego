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
  ) { }

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
      console.log('service : toggleReady');
      console.log(dto);
      console.log('id :', id);
      let game = await this.data.findOneBy({ id });
      console.log('game :');
      console.log(game);
      if (!game) {
        console.log('game null');
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
          game.status_player_red = 'C' as PlayerStatus;
          game.red_initial_positions = '[]';
        } else {
          game.status_player_red = 'R' as PlayerStatus;
          game.red_initial_positions = dto.positions;
        }
      } else {
        console.log('blue');
        if (somme < 200) {
          game.status_player_blue = 'C' as PlayerStatus;
          game.blue_initial_positions = '[]';
        } else {
          game.status_player_blue = 'R' as PlayerStatus;
          game.blue_initial_positions = dto.positions;
        }
      }

      if (
        game.status_player_red == 'R' &&
        game.status_player_blue == 'R' &&
        game.red_initial_positions != '[]' &&
        game.blue_initial_positions != '[]'
      ) {
        console.log('ready 2 ways');
        game.starting_date = new Date();
        game.status_player_red = 'P' as PlayerStatus;
        game.status_player_blue = 'W' as PlayerStatus;
      }

      let red_positions = game.red_initial_positions
        ? JSON.parse(game.red_initial_positions)
        : [];
      console.log('red_positions:');
      console.log(red_positions);
      let red_positions_objects = [];
      if (red_positions.length <= 20) {
        red_positions_objects = this.getEmptyPositions('red');
      } else {
        for (let i = 60; i < 100; i++) {
          let piece = { color: 'red', rank: red_positions[i], hidden: true };
          red_positions_objects.push(piece);
        }
      }
      console.log('red_positions_objects:');
      console.log(red_positions_objects);

      let blue_positions = game.blue_initial_positions
        ? JSON.parse(game.blue_initial_positions)
        : [];
      blue_positions = blue_positions.slice().reverse();
      console.log('blue_positions:');
      console.log(blue_positions);
      let blue_positions_objects = [];
      if (blue_positions.length <= 20) {
        blue_positions_objects = this.getEmptyPositions('blue');
      } else {
        for (let i = 0; i < 40; i++) {
          let piece = { color: 'blue', rank: blue_positions[i], hidden: true };
          blue_positions_objects.push(piece);
        }
      }
      console.log('blue_positions_objects:');
      console.log(blue_positions_objects);

      let empty_field = new Array(20).fill(null);

      let positions = blue_positions_objects
        .concat(empty_field)
        .concat(red_positions_objects);
      game.positions = JSON.stringify(positions);

      console.log(game);
      let patch = {
        status_player_red: game.status_player_red,
        status_player_blue: game.status_player_blue,
        red_initial_positions: game.red_initial_positions,
        blue_initial_positions: game.blue_initial_positions,
        starting_date: game.starting_date,
        positions: game.positions,
      };

      console.log('patch :');
      console.log(patch);

      await this.data.update(id, patch);
    } catch (e) {
      console.log('error : ', e);
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
    return this.findOne(id);
  }

  getEmptyPositions(color: string) {
    const newArray = Array.from({ length: 40 }, () => ({
      color: color,
      rank: null,
    }));
    return newArray;
  }
  async move(id: number, dto: MoveDto): Promise<Game> {
    console.log(dto);
    try {
      let find = await this.data.findOneBy({ id });
      if (!find) {
        console.log('find null');
        throw new NotFoundException();
      }
      let positions = JSON.parse(find.positions);
      let origine = dto.origine;
      let destination = dto.destination;
      let piece_origine = positions[origine];
      let piece_destination = positions[destination];
      if (!piece_origine) {
        let i = 0;
        positions.forEach((element) => {
          console.log(i);
          i += 1;
          console.log(element);
        });
        console.log('piece_origine null');
        throw new NotFoundException();
      }
      if (!piece_destination) {
        console.log('piece_destination null');
        positions[destination] = piece_origine;
        positions[origine] = null;
        console.log(positions);
        find.positions = JSON.stringify(positions);
        console.log(find);
        find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color}  avance`;
      } else {
        if (piece_origine.color == piece_destination.color) {
          console.log('piece_destination color');
          throw new NotFoundException();
        }
        if (piece_origine.rank > piece_destination.rank) {
          console.log('piece_destination rank mois forte');
          positions[destination] = piece_origine;
          positions[origine] = null;
          console.log('positions done');
          find.positions = JSON.stringify(positions);
          find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color} a mangé la piece ${piece_destination.color} ${piece_destination.rank}`;
        }
        if (piece_origine.rank == piece_destination.rank) {
          console.log('piece_destination rank égale');
          positions[origine] = null;
          positions[destination] = null;
          find.positions = JSON.stringify(positions);
          find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color} et la piece ${piece_destination.color} ${piece_destination.rank} s'entredétruisent`;
        } else {
          console.log('piece_destination rank plus forte');
          console.log(positions);
          positions[origine] = null;
          find.positions = JSON.stringify(positions);
          console.log(find.positions);

          find.last_event = `Piece ${piece_origine.rank} ${piece_origine.color} a été mangé par la piece ${piece_destination.color} ${piece_destination.rank}`;

          console.log(find.last_event);
        }
      }
      let status_player_blue = find.status_player_blue;
      let status_player_red = find.status_player_red;
      let patch = {
        status_player_red: status_player_blue as PlayerStatus,
        status_player_blue: status_player_red as PlayerStatus,
        positions: find.positions,
        last_event: find.last_event,
      };

      console.log(patch);

      await this.data.update(id, patch);
      console.log('update fait');
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
      if (positions != null) {
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
      }
      found.positions = JSON.stringify(positions_filtered);
    }
    return found;
  }

  async joinGame(id: number, dto: JoinGameDto): Promise<Game> {
    try {
      let enriched_dto = { ...dto, status: GameStatus.MATCH };
      let done = await this.data.update(id, enriched_dto);
      if (done.affected != 1) {
        throw new NotFoundException();
      }
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
