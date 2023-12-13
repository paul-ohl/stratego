import { IsDefined, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { PlayerStatus } from '../enums/player-status.enum';

export class JoinGameDto {
  @MaxLength(100)
  player_blue_name: string;
}
