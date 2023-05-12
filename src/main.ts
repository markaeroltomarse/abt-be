import corsConfig from '@config/cors.config';
import { AppModule } from '@modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.enableCors(corsConfig);

  await app.listen(+process.env.APP_PORT || 3000, '0.0.0.0').then(async () => {
    Logger.log(
      `✅  Application is running on: ${await app.getUrl()}`,
      'NestJS',
    );
  });
}
bootstrap().catch((e) => {
  Logger.error('❌  Error starting server', e, 'NestJS', false);
  throw e;
});
