import { IsDefined, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { PlayerStatus } from '../enums/player-status.enum';

export class CreateGameDto {
  @MaxLength(100)
  player_red_name: string;
}
