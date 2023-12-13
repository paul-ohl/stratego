"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed1702384855974 = void 0;
const hint_entity_1 = require("../hint/entities/hint.entity");
class Seed1702384855974 {
    async up(run) {
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[6,2,2,5,2,6,3,10,2,6,5,4,11,1,9,2,7,7,8,2,4,11,4,7,8,5,11,5,6,4,2,3,11,2,3,11,0,11,3,3]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[10,6,5,3,2,6,2,2,2,6,4,2,8,8,9,2,4,11,11,5,7,2,7,1,6,5,11,4,5,2,7,3,3,3,4,11,0,11,11,3]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[6,2,4,9,6,2,2,10,2,6,5,2,7,5,11,2,7,7,8,3,4,8,1,3,11,2,6,5,5,11,3,11,4,11,4,2,3,3,11,0]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[2,8,5,2,6,2,9,3,2,6,10,2,7,8,2,6,11,5,11,5,6,4,7,1,7,5,11,4,11,4,3,2,3,3,4,11,0,11,3,2]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[9,6,2,4,2,2,2,3,6,2,3,2,8,7,11,5,10,7,5,8,11,6,1,7,5,2,6,5,11,4,4,2,3,11,4,3,3,11,0,11]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[2,6,5,9,2,6,2,10,6,2,7,2,11,1,8,4,2,7,8,4,5,4,11,2,7,3,5,6,5,11,3,11,4,2,3,11,3,3,11,0]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[10,7,3,4,11,11,4,3,7,9,7,2,8,2,6,5,2,8,2,1,11,6,2,5,4,11,6,2,3,2,0,11,5,3,11,4,3,6,2,5]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[2,2,11,0,11,11,4,2,2,2,7,9,8,11,10,7,11,3,8,7,5,4,6,6,3,3,6,2,6,5,2,4,3,5,2,1,4,11,5,3]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[4,3,5,7,4,2,5,7,4,3,11,11,10,8,11,11,8,9,11,11,5,1,6,4,6,3,2,6,2,2,0,7,6,2,2,2,5,2,3,3]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[11,9,10,2,4,5,4,5,5,11,8,1,11,6,4,2,2,11,5,6,11,7,3,3,8,7,2,7,4,2,0,11,3,3,3,6,2,2,6,2]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[6,2,9,11,4,4,2,2,4,4,8,10,2,8,11,5,2,5,2,3,11,3,1,7,6,11,3,6,5,2,0,11,7,3,7,6,11,3,2,5]',
        }));
        await run.manager.save(run.manager.create(hint_entity_1.Hint, {
            positions: '[11,9,1,8,2,5,3,8,2,5,4,11,3,6,7,10,2,2,7,2,11,4,11,2,2,5,4,6,2,6,0,11,4,11,6,3,3,3,5,7]',
        }));
    }
    async down(queryRunner) { }
}
exports.Seed1702384855974 = Seed1702384855974;
//# sourceMappingURL=1702384855974-Seed.js.map