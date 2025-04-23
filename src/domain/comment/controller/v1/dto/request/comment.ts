import { PostIdParam } from '@/domain/post/controller/v1/dto/request/post';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';
export class CommentIdParam extends PostIdParam {
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @Min(1)
    readonly commentId: number;
}
