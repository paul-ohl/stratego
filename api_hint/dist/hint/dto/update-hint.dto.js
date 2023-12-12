"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHintDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hint_dto_1 = require("./create-hint.dto");
class UpdateHintDto extends (0, mapped_types_1.PartialType)(create_hint_dto_1.CreateHintDto) {
}
exports.UpdateHintDto = UpdateHintDto;
//# sourceMappingURL=update-hint.dto.js.map