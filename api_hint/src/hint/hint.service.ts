import { Injectable } from '@nestjs/common';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hint } from './entities/hint.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class HintService {
  constructor(
    @InjectRepository(Hint) private readonly data: Repository<Hint>,
  ) {}

  async create(dto: CreateHintDto): Promise<Hint> {
    try {
      return await this.data.save(dto);
    } catch (e) {
      throw new ConflictException();
    }
  }

  findAll() {
    return `This action returns all hint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hint`;
  }

  async randomOne(): Promise<Hint> {
    const length = await this.data.count();
    const id = Math.floor(Math.random() * length);
    const found = await this.data.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  update(id: number, updateHintDto: UpdateHintDto) {
    return `This action updates a #${id} hint`;
  }

  remove(id: number) {
    return `This action removes a #${id} hint`;
  }
}
