import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { swaggerProvider } from './providers/swagger.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get<ConfigService>(ConfigService);
  // set debug mode
  app.useLogger(config.get('logLever', false));

  // set prefix url
  app.setGlobalPrefix(config.get('prefix', '/'));

  // create swagger document
  swaggerProvider(app);

  // start application
  await app.listen(await config.get('port', 3000), async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
