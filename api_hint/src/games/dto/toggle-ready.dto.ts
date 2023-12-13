import { IsDefined, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { PlayerStatus } from '../enums/player-status.enum';

export class ToggleReadyDto {
  @IsDefined()
  @IsNotEmpty()
  color: 'red' | 'blue';

  @IsDefined()
  @IsNotEmpty()
  positions: string;
}
