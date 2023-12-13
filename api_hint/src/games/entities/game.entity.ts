import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { PlayerStatus } from '../enums/player-status.enum';
import { GameStatus } from '../enums/game-status.enum';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  creation_date: Date;

  @Column({ nullable: true })
  starting_date: Date;

  @Column({ nullable: true })
  ending_date: Date;

  @Column()
  status: GameStatus;

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

  @Column({ nullable: true })
  winner?: string;
}
