import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HintModule } from './hint/hint.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from './games/games.module';
import { EventsModule } from './events/events.module';

@Module({
	imports: [
		ConfigModule.forRoot({}),
		TypeOrmModule.forRoot({
			type: 'mariadb',
			host: process.env.DB_HOST || 'localhost',
			port: +process.env.DB_PORT || 3307,
			username: process.env.DB_USERNAME || 'root',
			password: process.env.DB_PASSWORD || 'root',
			database: process.env.DB_NAME || 'stratego',
			autoLoadEntities: true,
			synchronize: true,
		}),
		HintModule,
		GamesModule,
		EventsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
