import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
<<<<<<< HEAD
=======

>>>>>>> 7801b11e2576f8cf931e6898567392512888a1d4
import { AppModule } from './src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
}
bootstrap();
