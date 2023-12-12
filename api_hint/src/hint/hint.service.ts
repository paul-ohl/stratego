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

  findAll(): Promise<Hint[]> {
    return this.data.find();
  }

  async findOne(id: number): Promise<Hint> {
    const found = await this.data.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async findRandom(): Promise<Hint> {
    const length = await this.data.count();
    const id = Math.floor(Math.random() * length);
    const found = await this.data.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(id: number, dto: UpdateHintDto): Promise<Hint> {
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
