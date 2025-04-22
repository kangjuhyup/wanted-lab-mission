import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalExceptionsFilter } from './common/filter/internal.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new InternalExceptionsFilter());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
