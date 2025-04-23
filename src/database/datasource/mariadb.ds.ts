import { DataSource, DataSourceOptions } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { CommentEntity } from '../entity/comment.entity';
import * as dotenv from 'dotenv';
import { NotificationEntity } from '../entity/notification.entity';
import { NotificationKeywordEntity } from '../entity/notification.keyword.entity';
import { NotificationTypeEntity } from '../entity/notification.type.entity';
import { KeywordEntity } from '../entity/keyword.entity';

dotenv.config();

// TypeORM 데이터소스 옵션
export const typeOrmConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities : [PostEntity, CommentEntity, NotificationEntity, NotificationKeywordEntity, NotificationTypeEntity, KeywordEntity],
    logging: process.env.NODE_ENV === 'development',
    migrations: [__dirname + '/../migration/*.{js,ts}'],
};

// TypeORM 데이터소스 인스턴스
export const AppDataSource = new DataSource(typeOrmConfig);