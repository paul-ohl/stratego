import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
);

export default new DataSource({
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
