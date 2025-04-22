/**
 * @description
 * 트랜잭션을 적용할 메서드에 사용됩니다.
 * 트랜잭션 내에서 예외가 발생하면 자동으로 롤백됩니다.
 * 이 데코레이터를 사용하는 클래스는 TransactionService를 주입받아야 합니다.
 *
 * @example
 * 
 * constructor(
 *   private readonly transactionService: TransactionService,
 * ) {}
 * 
 * @Transaction()
 * async createPost(postData: CreatePostDto) {
 *   // 트랜잭션 내에서 실행될 코드
 * }
 */
export function Transaction() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        // TransactionService 접근
        const transactionService = this.transactionService;
        if (!transactionService) {
          throw new Error('TransactionService가 주입되지 않았습니다.');
        }
        
        // TypeORM에서는 withTransaction 메서드를 통해 트랜잭션 실행
        return await transactionService.withTransaction(async (em) => {
          // 서비스 인스턴스의 모든 프로퍼티를 순회하면서,
          // 레포지토리에 트랜잭션 EntityManager 자동 주입
          for (const key of Object.keys(this)) {
            const repo = this[key];
            if (repo && typeof repo.setEntityManager === 'function') {
              repo.setEntityManager(em);
            }
          }
          
          // 원래 메서드 실행
          return await originalMethod.apply(this, args);
        });
      } catch (error) {
        console.error('메서드 실행 중 오류 발생:', error);
        throw error;
      }
    };

    return descriptor;
  };
}
