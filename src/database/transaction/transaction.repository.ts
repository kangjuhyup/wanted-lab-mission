import { EntityManager, Repository, ObjectLiteral, QueryBuilder } from 'typeorm';

// 트랜잭션을 지원하는 추상 레포지토리 클래스
export abstract class TransactionRepository<T extends ObjectLiteral> {
  protected em?: EntityManager;
  protected fallbackRepo: Repository<T>;

  constructor(fallbackRepo: Repository<T>) {
    this.fallbackRepo = fallbackRepo;
  }

  setEntityManager(em: EntityManager) {
    this.em = em;
  }
 
  get repository(): Repository<T> {
    if (this.em) {
      const entityClass = this.fallbackRepo.metadata.target as Function;
      return this.em.getRepository<T>(entityClass);
    }
    return this.fallbackRepo;
  }

  getQueryBuilder(alias: string): QueryBuilder<T> {
    return this.repository.createQueryBuilder(alias);
  }
}