import { Transform } from "class-transformer";
import { IsNotEmpty, Min } from "class-validator";

/**
 * @description
 * 하위 댓글 조회시 limit,offset 기반이 아닌 사용자 액션에 따른 cursor 기반 페이지네이션
 */
export class GetCommentChildrenQuery {
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @Min(1)
    readonly commentId : number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @Min(1)
    readonly cursor : number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @Min(1)
    readonly limit : number;
}