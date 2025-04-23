import { PostRepository } from '@/domain/post/repository/post.repository';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  
  /**
   * @description
   * 게시글 권한 -게시글 권한 검사 가드
   * 게시글 패스워드와 입력받은 패스워드가 동일한지 확인
   * @example
   * @UseGuards(PostAuthGuard)
   */
  @Injectable()
  export class PostAuthGuard implements CanActivate {
    constructor(private readonly postRepository: PostRepository) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const postId = request.params.postId;
      const password = request.body.password;
      if(!postId) {
        throw new UnauthorizedException('게시글 권한이 없습니다.');
      }
      const post = await this.postRepository.selectOne({ id: Number(postId), withComment: false });
  
      if (!post) {
        throw new NotFoundException('게시글을 찾을 수 없습니다.');
      }
  
      if (!(await post.checkPassword(password))) {
        throw new UnauthorizedException('게시글 비밀번호가 일치하지 않습니다.');
      }
  
      return true;
    }
  }