"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_NAME);
exports.default = new typeorm_1.DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3307,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsRun: true,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=migration-config.js.map