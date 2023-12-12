import { IsDefined, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { PlayerStatus } from '../enums/player-status.enum';

export class CreateGameDto {
  @MaxLength(100)
  player_red_name?: string;

  @MaxLength(100)
  player_blue_name?: string;

  status_player_red?: PlayerStatus;

  status_player_blue?: PlayerStatus;

  positions?: string;

  red_initial_positions?: string;

  blue_initial_positions?: string;
}
