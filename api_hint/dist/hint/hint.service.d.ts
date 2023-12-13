import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
import { Repository } from 'typeorm';
import { Hint } from './entities/hint.entity';
export declare class HintService {
    private readonly data;
    constructor(data: Repository<Hint>);
    create(dto: CreateHintDto): Promise<Hint>;
    findAll(): Promise<Hint[]>;
    findOne(id: number): Promise<Hint>;
    findRandom(): Promise<Hint>;
    update(id: number, dto: UpdateHintDto): Promise<Hint>;
    remove(id: number): Promise<void>;
}
