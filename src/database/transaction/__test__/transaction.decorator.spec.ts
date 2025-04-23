import { Transaction } from '@database/transaction/transaction.decorator';

describe('Transaction 데코레이터', () => {
  const emStub = { id: 'EM' };
  let transactionServiceMock: { withTransaction: jest.Mock };
  let dummyService: any;

  class DummyService {
    repo1: { setEntityManager: jest.Mock };
    repo2: { setEntityManager: jest.Mock };
    transactionService: any;

    constructor(tx: any) {
      this.transactionService = tx;
      this.repo1 = { setEntityManager: jest.fn() };
      this.repo2 = { setEntityManager: jest.fn() };
    }

    @Transaction()
    async doWork(arg: string, num: number) {
      return `result:${arg}:${num}`;
    }
  }

  beforeEach(() => {
    transactionServiceMock = { withTransaction: jest.fn(async (cb) => await cb(emStub)) };
    dummyService = new DummyService(transactionServiceMock);
  });

  it('withTransaction 호출 및 repos에 EntityManager 주입 후 메서드 실행 결과 반환', async () => {
    const ret = await dummyService.doWork('A', 1);

    expect(transactionServiceMock.withTransaction).toHaveBeenCalled();
    expect(dummyService.repo1.setEntityManager).toHaveBeenCalledWith(emStub);
    expect(dummyService.repo2.setEntityManager).toHaveBeenCalledWith(emStub);
    expect(ret).toBe('result:A:1');
  });

  it('TransactionService 미주입 시 에러 발생', async () => {
    class NoTx {
      @Transaction()
      async fn() {
        return 42;
      }
    }
    const noTx = new NoTx();
    await expect(noTx.fn()).rejects.toThrow('TransactionService가 주입되지 않았습니다.');
  });

  it('데코레이터 없는 메서드는 repository 호출만 수행', async () => {
    class NoDecoratorService {
      repo: { action: jest.Mock };
      constructor() {
        this.repo = { action: jest.fn().mockReturnValue('done') };
      }
      async work(val: number) {
        return this.repo.action(val);
      }
    }
    const service = new NoDecoratorService();
    const result = await service.work(5);

    expect(service.repo.action).toHaveBeenCalledWith(5);
    expect(result).toBe('done');
  });
});
