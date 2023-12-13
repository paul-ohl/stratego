import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Specify the allowed HTTP headers
    credentials: true, // Allow sending cookies from the client
  };

  // Enable CORS using the cors middleware
  app.enableCors(corsOptions);

  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
