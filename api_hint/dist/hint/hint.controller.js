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
exports.HintController = void 0;
const common_1 = require("@nestjs/common");
const hint_service_1 = require("./hint.service");
const create_hint_dto_1 = require("./dto/create-hint.dto");
const update_hint_dto_1 = require("./dto/update-hint.dto");
let HintController = class HintController {
    constructor(hintService) {
        this.hintService = hintService;
    }
    create(createHintDto) {
        return this.hintService.create(createHintDto);
    }
    findAll() {
        return this.hintService.findAll();
    }
    findRandom() {
        return this.hintService.findRandom();
    }
    findOne(id) {
        return this.hintService.findOne(+id);
    }
    update(id, updateHintDto) {
        return this.hintService.update(+id, updateHintDto);
    }
    remove(id) {
        return this.hintService.remove(+id);
    }
};
exports.HintController = HintController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hint_dto_1.CreateHintDto]),
    __metadata("design:returntype", void 0)
], HintController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HintController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HintController.prototype, "findRandom", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HintController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hint_dto_1.UpdateHintDto]),
    __metadata("design:returntype", void 0)
], HintController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HintController.prototype, "remove", null);
exports.HintController = HintController = __decorate([
    (0, common_1.Controller)('hint'),
    __metadata("design:paramtypes", [hint_service_1.HintService])
], HintController);
//# sourceMappingURL=hint.controller.js.map