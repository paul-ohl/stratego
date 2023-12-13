import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PlayerStatus } from '../enums/player-status.enum';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  player_red_name: string;

  @Column({ nullable: true })
  player_blue_name?: string;

  @Column({ type: 'enum', enum: PlayerStatus })
  status_player_red?: PlayerStatus;

  @Column({ type: 'enum', enum: PlayerStatus })
  status_player_blue?: PlayerStatus;

  @Column({ type: 'text', nullable: true })
  positions: string;

  @Column({ type: 'text', nullable: true })
  red_initial_positions: string;

  @Column({ type: 'text', nullable: true })
  blue_initial_positions: string;

  @Column({ type: 'text', nullable: true })
  last_event: string;
}
