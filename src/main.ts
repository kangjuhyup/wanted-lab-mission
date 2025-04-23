import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalExceptionsFilter } from './common/filter/internal.exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  app.useGlobalFilters(new InternalExceptionsFilter());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
