import { HintService } from './hint.service';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
export declare class HintController {
    private readonly hintService;
    constructor(hintService: HintService);
    create(createHintDto: CreateHintDto): Promise<import("./entities/hint.entity").Hint>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateHintDto: UpdateHintDto): string;
    remove(id: string): string;
}
