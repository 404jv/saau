import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppModule } from '@/app.module.js';
import { ErrorHandler } from '@/error-handler.js';

export async function makeApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(APP_FILTER)
    .useClass(ErrorHandler)
    .compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api/v1');

  await app.init();

  return app;
}
