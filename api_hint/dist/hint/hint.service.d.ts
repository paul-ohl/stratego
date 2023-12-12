import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
import { Repository } from 'typeorm';
import { Hint } from './entities/hint.entity';
export declare class HintService {
    private readonly data;
    constructor(data: Repository<Hint>);
    create(dto: CreateHintDto): Promise<Hint>;
    findAll(): string;
    findOne(id: number): string;
    randomOne(): Promise<Hint>;
    update(id: number, updateHintDto: UpdateHintDto): string;
    remove(id: number): string;
}
