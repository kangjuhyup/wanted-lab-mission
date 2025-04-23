import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalExceptionsFilter } from './common/filter/internal.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  app.useGlobalFilters(new InternalExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('원티드랩 과제')
    .setDescription('게시판 & 키워드 알림')
    .setVersion('1.0')
    .build();

  // @ts-ignore
  const document = SwaggerModule.createDocument(app, config);
  // @ts-ignore 
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
