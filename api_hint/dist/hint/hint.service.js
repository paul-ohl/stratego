"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hint_entity_1 = require("./entities/hint.entity");
const common_2 = require("@nestjs/common");
let HintService = class HintService {
    constructor(data) {
        this.data = data;
    }
    async create(dto) {
        try {
            return await this.data.save(dto);
        }
        catch (e) {
            throw new common_2.ConflictException();
        }
    }
    findAll() {
        return this.data.find();
    }
    async findOne(id) {
        const found = await this.data.findOneBy({ id });
        if (!found) {
            throw new common_2.NotFoundException();
        }
        return found;
    }
    async findRandom() {
        const length = await this.data.count();
        const id = Math.floor(Math.random() * length);
        const found = await this.data.findOneBy({ id });
        if (!found) {
            throw new common_2.NotFoundException();
        }
        return found;
    }
    async update(id, dto) {
        try {
            let done = await this.data.update(id, dto);
            if (done.affected != 1) {
                throw new common_2.NotFoundException();
            }
        }
        catch (e) {
            throw e instanceof common_2.NotFoundException ? e : new common_2.ConflictException();
        }
        return this.findOne(id);
    }
    async remove(id) {
        let done = await this.data.delete(id);
        if (done.affected != 1) {
            throw new common_2.NotFoundException();
        }
    }
};
exports.HintService = HintService;
exports.HintService = HintService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hint_entity_1.Hint)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HintService);
//# sourceMappingURL=hint.service.js.map