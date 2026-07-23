// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não definidos no DTO
      forbidNonWhitelisted: true, // Rejeita campos não definidos
      transform: true, // Transforma automaticamente os dados
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS
  app.enableCors();

  await app.listen(3000);
  console.log('🚀 Servidor rodando em http://localhost:3000');
  console.log('📅 Schedules API disponível em http://localhost:3000/schedules');
}
bootstrap();