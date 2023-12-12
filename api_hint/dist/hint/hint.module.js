"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintModule = void 0;
const common_1 = require("@nestjs/common");
const hint_service_1 = require("./hint.service");
const hint_controller_1 = require("./hint.controller");
const typeorm_1 = require("@nestjs/typeorm");
const hint_entity_1 = require("./entities/hint.entity");
let HintModule = class HintModule {
};
exports.HintModule = HintModule;
exports.HintModule = HintModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hint_entity_1.Hint])],
        controllers: [hint_controller_1.HintController],
        providers: [hint_service_1.HintService],
    })
], HintModule);
//# sourceMappingURL=hint.module.js.map