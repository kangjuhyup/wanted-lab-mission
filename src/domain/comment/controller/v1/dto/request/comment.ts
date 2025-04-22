import { PostIdParam } from '@/domain/post/controller/v1/dto/request/post';
export class CommentIdParam extends PostIdParam {
    readonly commentId: number;
}
