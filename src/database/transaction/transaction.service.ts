import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * 트랜잭션 내에서 콜백 함수를 실행합니다.
   * @param callback 트랜잭션 내에서 실행할 콜백 함수
   * @returns 콜백 함수의 반환값
   */
  async withTransaction<T>(
    callback: (em: EntityManager) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const result = await callback(queryRunner.manager);
      
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      // 오류 발생 시 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
