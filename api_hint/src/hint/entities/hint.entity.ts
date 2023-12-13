import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column, Index } from 'typeorm';

@Entity()
export class Hint {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({ type: 'text' })
  positions: string;
}
