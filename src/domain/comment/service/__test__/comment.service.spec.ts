import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment.service';
import { CommentEntity } from '@/database/entity/comment.entity';
import { CommentRepository } from '../../repository/comment.repository';

describe('CommentService', () => {
  let service: CommentService;
  let repo: jest.Mocked<CommentRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: {
            count: jest.fn(),
            selectManyWhere: jest.fn(),
            selectChild: jest.fn(),
            insert: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    repo = module.get(CommentRepository);
  });

  // count 메소드 테스트
  describe('count', () => {
    it('count 호출 후 결과 반환', async () => {
      const param = { postId: 1 };
      const expected = 3;
      repo.count.mockResolvedValue(expected);

      const result = await service.count(param as any);

      expect(repo.count).toHaveBeenCalledWith(param);
      expect(result).toBe(expected);
    });
  });

  // getComments 메소드 테스트
  describe('getComments', () => {
    it('selectManyWhere 호출 시 postId와 withChild=false, query 병합', async () => {
      const postId = 2;
      const query = { offset: 0, limit: 5 };
      const expected = [{}, {}];
      repo.selectManyWhere.mockResolvedValue(expected as any);

      const result = await service.getComments(postId, query as any);

      expect(repo.selectManyWhere).toHaveBeenCalledWith({ postId, withChild: false, ...query });
      expect(result).toBe(expected);
    });
  });

  // getCommentChilds 메소드 테스트
  describe('getCommentChilds', () => {
    it('selectChild 호출 후 결과 반환', async () => {
      const commentId = 5;
      const expected = [{ id: 1 }];
      repo.selectChild.mockResolvedValue(expected as any);

      const result = await service.getCommentChilds(commentId);

      expect(repo.selectChild).toHaveBeenCalledWith(commentId);
      expect(result).toBe(expected);
    });
  });

  // createComment 메소드 테스트
  describe('createComment', () => {
    it('CommentEntity.of 호출 후 insert 및 생성된 댓글 반환', async () => {
      const param = { postId: 3, commentId: 7, body: { content: 'test', author: 'u', password: 'p' } };
      const mockComment = {} as CommentEntity;
      jest.spyOn(CommentEntity, 'of').mockReturnValue(mockComment);

      const result = await service.createComment(param as any);

      expect(CommentEntity.of).toHaveBeenCalledWith({
        postId: param.postId,
        parentId: param.commentId,
        ...param.body,
      });
      expect(repo.insert).toHaveBeenCalledWith(mockComment);
      expect(result).toBe(mockComment);
    });
  });

  // deleteComment 메소드 테스트
  describe('deleteComment', () => {
    it('delete 호출', async () => {
      const commentId = 9;

      await service.deleteComment(commentId);

      expect(repo.delete).toHaveBeenCalledWith(commentId);
    });
  });
});
