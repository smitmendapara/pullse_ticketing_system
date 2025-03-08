import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  
  Logger.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();
