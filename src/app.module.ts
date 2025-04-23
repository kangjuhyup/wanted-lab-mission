import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM 모듈 import
import { typeOrmConfig } from './database/datasource/mariadb.ds'; // 마리아DB 연결 옵션 import
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './domain/event.module';
import { RouterModule } from './domain/router.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    EventEmitterModule.forRoot(),
    EventModule,
    RouterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
