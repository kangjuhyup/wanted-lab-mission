import { ExecutionContext } from '@nestjs/common';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PostAuthGuard } from '../post.author.guard';

describe('PostAuthGuard', () => {
  let guard: PostAuthGuard;
  let repo: { selectOne: jest.Mock };
  let context: ExecutionContext & any;

  beforeEach(() => {
    repo = { selectOne: jest.fn() };
    guard = new PostAuthGuard(repo as any);
    context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: { postId: '1' }, body: { password: 'pw' } }),
      }),
    } as any;
  });

  it('postId가 없으면 UnauthorizedException 발생', async () => {
    const ctx = { switchToHttp: () => ({ getRequest: () => ({ params: {}, body: {} }) }) } as any;
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });

  it('게시글이 없으면 NotFoundException 발생', async () => {
    repo.selectOne.mockResolvedValue(null);
    await expect(guard.canActivate(context)).rejects.toThrow(NotFoundException);
    expect(repo.selectOne).toHaveBeenCalledWith({ id: 1, withComment: false });
  });

  it('비밀번호가 일치하지 않으면 UnauthorizedException 발생', async () => {
    const mockPost = { checkPassword: jest.fn().mockResolvedValue(false) };
    repo.selectOne.mockResolvedValue(mockPost);
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('비밀번호가 일치하면 true 반환', async () => {
    const mockPost = { checkPassword: jest.fn().mockResolvedValue(true) };
    repo.selectOne.mockResolvedValue(mockPost);
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });
});
