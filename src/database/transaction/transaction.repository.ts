import { EntityManager, EntityTarget, Repository, ObjectLiteral, QueryBuilder } from 'typeorm';

// 트랜잭션을 지원하는 추상 레포지토리 클래스
export abstract class TransactionRepository<T extends ObjectLiteral> {
  protected em: EntityManager;

  constructor() {}

  setEntityManager(em: EntityManager) {
    this.em = em;
  }

  get repository() : Repository<T> {
    return this.getRepository();
  }

  getQueryBuilder(alias:string) : QueryBuilder<T> {
    return this.getRepository().createQueryBuilder(alias);
  }

  getRepository() : Repository<T> {
    if (!this.em) {
      throw new Error('EntityManager가 설정되지 않았습니다. setEntityManager를 먼저 호출해야 합니다.');
    }
    return this.em.getRepository(this.getEntityClass());
  }

  protected abstract getEntityClass(): EntityTarget<T>;
}