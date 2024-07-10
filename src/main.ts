import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import { INestApplication } from '@nestjs/common';
import dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
  dotenv.config();

  const app: INestApplication = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '512mb' }));
  app.use(urlencoded({ limit: '512mb', extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then();
