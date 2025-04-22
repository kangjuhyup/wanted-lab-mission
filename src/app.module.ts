import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM 모듈 import
import { typeOrmConfig } from './database/datasource/mariadb.ds'; // 마리아DB 연결 옵션 import
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostEntity } from './database/entity/post.entity';
import { CommentEntity } from './database/entity/comment.entity';
import { TransactionService } from './database/transaction/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([PostEntity, CommentEntity]), // 엔티티 등록
  ],
  controllers: [AppController],
  providers: [AppService, TransactionService], // 트랜잭션 서비스 등록
})
export class AppModule {}
