import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post.service';
import { PostRepository } from '../../repository/post.repository';
import { PostEntity } from '@/database/entity/post.entity';

describe('PostService', () => {
  let service: PostService;
  let repo: jest.Mocked<PostRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: {
            selectMany: jest.fn(),
            selectOne: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repo = module.get(PostRepository);
  });

  // 게시글 목록 조회 (댓글 미포함)
  describe('getPosts', () => {
    it('withComment=false로 selectMany 호출 후 결과 반환', async () => {
      const query = { limit: 5, offset: 0 };
      const expected = [{}, {}];
      repo.selectMany.mockResolvedValue(expected as any);

      const result = await service.getPosts(query as any);

      expect(repo.selectMany).toHaveBeenCalledWith({ ...query, withComment: false });
      expect(result).toBe(expected);
    });
  });

  // 게시글 목록 조회 (댓글 포함)
  describe('getPostsWithComments', () => {
    it('withComment=true로 selectMany 호출 후 결과 반환', async () => {
      const query = { limit: 3, offset: 1 };
      const expected = [{ id: 1, comments: [] }];
      repo.selectMany.mockResolvedValue(expected as any);

      const result = await service.getPostsWithComments(query as any);

      expect(repo.selectMany).toHaveBeenCalledWith({ ...query, withComment: true });
      expect(result).toBe(expected);
    });
  });

  // 단일 게시글 조회
  describe('getPost', () => {
    it('withComment=false로 selectOne 호출 후 결과 반환', async () => {
      const id = 10;
      const expected = {};
      repo.selectOne.mockResolvedValue(expected as any);

      const result = await service.getPost(id);

      expect(repo.selectOne).toHaveBeenCalledWith({ id, withComment: false });
      expect(result).toBe(expected);
    });
  });

  // 단일 게시글 조회 (댓글 포함)
  describe('getPostWithComments', () => {
    it('withComment=true로 selectOne 호출 후 결과 반환', async () => {
      const id = 20;
      const expected = { comments: [] };
      repo.selectOne.mockResolvedValue(expected as any);

      const result = await service.getPostWithComments(id);

      expect(repo.selectOne).toHaveBeenCalledWith({ id, withComment: true });
      expect(result).toBe(expected);
    });
  });

  // 게시글 생성
  describe('createPost', () => {
    it('PostEntity.of 호출 후 insert 및 생성된 엔티티 반환', async () => {
      const body = { title: 't', content: 'c', author: 'a', password: 'p' };
      const mockPost = {} as PostEntity;
      jest.spyOn(PostEntity, 'of').mockReturnValue(mockPost);

      const result = await service.createPost(body as any);

      expect(PostEntity.of).toHaveBeenCalledWith(body);
      expect(repo.insert).toHaveBeenCalledWith(mockPost);
      expect(result).toBe(mockPost);
    });
  });

  // 게시글 수정
  describe('updatePost', () => {
    it('modify 호출 후 update 및 수정된 엔티티 반환', async () => {
      const post = { modify: jest.fn(), updatedAt: null } as unknown as PostEntity;
      const update = { title: 'new', content: 'new content' };

      const result = await service.updatePost(post, update);

      expect(post.modify).toHaveBeenCalledWith(update);
      expect(repo.update).toHaveBeenCalledWith(post);
      expect(result).toBe(post);
    });
  });

  // 게시글 삭제
  describe('deletePost', () => {
    it('delete 호출', async () => {
      const post = {} as PostEntity;

      await service.deletePost(post);

      expect(repo.delete).toHaveBeenCalledWith(post);
    });
  });
});
