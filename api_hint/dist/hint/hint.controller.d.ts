import { HintService } from './hint.service';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
export declare class HintController {
    private readonly hintService;
    constructor(hintService: HintService);
    create(createHintDto: CreateHintDto): Promise<import("./entities/hint.entity").Hint>;
    findAll(): Promise<import("./entities/hint.entity").Hint[]>;
    findRandom(): Promise<import("./entities/hint.entity").Hint>;
    findOne(id: string): Promise<import("./entities/hint.entity").Hint>;
    update(id: string, updateHintDto: UpdateHintDto): Promise<import("./entities/hint.entity").Hint>;
    remove(id: string): Promise<void>;
}
