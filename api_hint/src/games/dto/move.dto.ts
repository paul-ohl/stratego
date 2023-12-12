import { IsDefined, IsNotEmpty, MaxLength, Min, Max } from 'class-validator';

export class MoveDto {
  @IsDefined()
  @IsNotEmpty()
  @Min(0)
  @Max(99)
  origine: number;

  @IsDefined()
  @IsNotEmpty()
  @Min(0)
  @Max(99)
  destination: number;
}
