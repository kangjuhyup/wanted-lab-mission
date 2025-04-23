import { NotificationType } from '@/common/enum/notification.enum';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAllTables1682345678901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // PostEntity
    await queryRunner.createTable(new Table({
      name: 'tb_post',
      columns: [
        { name: 'postId', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'title', type: 'varchar(255)', isNullable: false },
        { name: 'content', type: 'text', isNullable: false },
        { name: 'author', type: 'varchar(20)', isNullable: false },
        { name: 'password', type: 'char(60)', isNullable: false },
        { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        { name: 'updatedAt', type: 'datetime', default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
        { name: 'deletedAt', type: 'datetime', isNullable: true },
      ],
    }), true);

    // CommentEntity
    await queryRunner.createTable(new Table({
      name: 'tb_comment',
      columns: [
        { name: 'commentId', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'content', type: 'text', isNullable: false },
        { name: 'author', type: 'varchar(20)', isNullable: false },
        { name: 'postId', type: 'int', isNullable: false },
        { name: 'parentId', type: 'int', isNullable: true },
        { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        { name: 'updatedAt', type: 'datetime', default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
        { name: 'deletedAt', type: 'datetime', isNullable: true },
      ],
    }), true);

    await queryRunner.createForeignKey('tb_comment', new TableForeignKey({
      columnNames: ['postId'],
      referencedTableName: 'tb_post',
      referencedColumnNames: ['postId'],
      onDelete: 'CASCADE',
    }));
    await queryRunner.createForeignKey('tb_comment', new TableForeignKey({
      columnNames: ['parentId'],
      referencedTableName: 'tb_comment',
      referencedColumnNames: ['commentId'],
      onDelete: 'CASCADE',
    }));

    // KeywordEntity
    await queryRunner.createTable(new Table({
      name: 'tb_keyword',
      columns: [
        { name: 'keywordId', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'keyword', type: 'varchar(20)', isNullable: false },
        { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        { name: 'updatedAt', type: 'datetime', default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
        { name: 'deletedAt', type: 'datetime', isNullable: true },
      ],
    }), true);

    // NotificationKeywordEntity
    await queryRunner.createTable(new Table({
      name: 'tb_notification_keyword',
      columns: [
        { name: 'userName', type: 'varchar', isPrimary: true },
        { name: 'keywordId', type: 'int', isPrimary: true },
      ],
    }), true);
    await queryRunner.createForeignKey('tb_notification_keyword', new TableForeignKey({
      columnNames: ['keywordId'],
      referencedTableName: 'tb_keyword',
      referencedColumnNames: ['keywordId'],
      onDelete: 'CASCADE',
    }));

    // NotificationEntity
    await queryRunner.createTable(new Table({
      name: 'tb_notification',
      columns: [
        { name: 'notificationId', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'userName', type: 'varchar(20)', isNullable: false },
        { name: 'typeId', type: 'int', isNullable: false },
        { name: 'message', type: 'text', isNullable: false },
        { name: 'isRead', type: 'tinyint', default: 0 },
        { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        { name: 'updatedAt', type: 'datetime', default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
        { name: 'deletedAt', type: 'datetime', isNullable: true },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'tb_notification_type',
      columns: [
        { name: 'notificationTypeId', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'notificationType', type: 'varchar(10)', isNullable: false },
      ],
    }), true);

    await queryRunner.createForeignKey('tb_notification', new TableForeignKey({
      columnNames: ['typeId'],
      referencedTableName: 'tb_notification_type',
      referencedColumnNames: ['notificationTypeId'],
      onDelete: 'CASCADE',
    }));

    // NotificationType
    await queryRunner.query('INSERT INTO tb_notification_type (notificationType) VALUES (?), (?)', [NotificationType.POST, NotificationType.COMMENT]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_notification', true, true, true);
    await queryRunner.dropTable('tb_notification_keyword', true, true, true);
    await queryRunner.dropTable('tb_keyword', true, true, true);
    await queryRunner.dropTable('tb_comment', true, true, true);
    await queryRunner.dropTable('tb_post', true, true, true);
    await queryRunner.dropTable('tb_notification_type', true, true, true);
  }
}
