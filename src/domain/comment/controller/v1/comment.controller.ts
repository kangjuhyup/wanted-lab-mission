import { ResponseDto } from "@/common/dto/response.dto";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateCommentBody } from "./dto/request/create.comment";
import { CommentFacade } from "../../comment.facade";
import { GetCommentsQuery } from "./dto/request/get.comments";
import { CommentIdParam } from "./dto/request/comment";
import { GetCommentChildrenQuery } from "./dto/request/get.comment.children";
import { PostIdParam } from "@/domain/post/controller/v1/dto/request/post";

@Controller('v1/comments')
export class CommentController {

    constructor(
        private readonly commentFacade : CommentFacade
    ) {}

    @Get('post/:postId')
    async getComments(@Param() postIdParam: PostIdParam, @Query() query: GetCommentsQuery) {
        return ResponseDto.Success(
            await this.commentFacade.getComments(postIdParam.postId, query)
        );
    }

    @Get(':postId/:commentId')
    async getChildComment(
        @Param() commentIdParam: CommentIdParam, 
        @Query() query: GetCommentChildrenQuery) {
        return ResponseDto.Success(
            await this.commentFacade.getCommentChildren(
                commentIdParam.postId, 
                commentIdParam.commentId,
                query
            )
        );
    }

    @Post(':postId')
    async createComment(@Param() postIdParam: PostIdParam, @Body() body: CreateCommentBody) {
        return ResponseDto.Success(
            await this.commentFacade.createComment({
                postId: postIdParam.postId,
                body
            })
        );
    }

    @Post(':postId/:commentId')
    async createChildComment(@Param() commentIdParam: CommentIdParam, @Body() body: CreateCommentBody) {
        return ResponseDto.Success(
            await this.commentFacade.createComment({
                postId: commentIdParam.postId,
                commentId: commentIdParam.commentId,
                body
            })
        );
    }
}
