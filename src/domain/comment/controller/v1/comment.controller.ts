import { ResponseDto } from "@/common/dto/response.dto";
import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from "@nestjs/common";
import { CreateCommentBody } from "./dto/request/create.comment";
import { CommentFacade } from "../../comment.facade";
import { GetCommentsQuery } from "./dto/request/get.comments";
import { CommentIdParam } from "./dto/request/comment";
import { PostIdParam } from "@/domain/post/controller/v1/dto/request/post";
import { ResponseValidationInterceptor } from "@/common/interceptor/response.validation.interceptor";
import { GetCommentsResponse } from "./dto/response/get.comments";
import { ApiOperation, ApiOkResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { CreateCommentResponse } from "./dto/response/create.comment";

@Controller('v1/comments')
export class CommentController {

    constructor(
        private readonly commentFacade : CommentFacade
    ) {}

    @Get('post/:postId')
    @ApiOperation({ summary: '게시글 댓글 목록 조회' })
    @ApiOkResponse({ type : () => GetCommentsResponse})
    @UseInterceptors(new ResponseValidationInterceptor(GetCommentsResponse))
    async getComments(@Param() postIdParam: PostIdParam, @Query() query: GetCommentsQuery) {
        return ResponseDto.Success(
            await this.commentFacade.getComments(postIdParam.postId, query)
        );
    }

    @Get(':postId/:commentId')
    @ApiOperation({ summary: '게시글 댓글 자식 목록 조회' })
    @ApiOkResponse({ type : () => GetCommentsResponse})
    @UseInterceptors(new ResponseValidationInterceptor(GetCommentsResponse))
    async getChildComment(
        @Param() commentIdParam: CommentIdParam
    ) {
        return ResponseDto.Success(
            await this.commentFacade.getCommentChildren(
                commentIdParam.commentId,
            )
        );
    }

    @Post(':postId')
    @ApiOperation({ summary: '게시글 댓글 생성' })
    @ApiCreatedResponse({ type : () => CreateCommentResponse})
    async createComment(@Param() postIdParam: PostIdParam, @Body() body: CreateCommentBody) {
        return ResponseDto.Success(
            await this.commentFacade.createComment({
                postId: postIdParam.postId,
                body
            })
        );
    }

    @Post(':postId/:commentId')
    @ApiOperation({ summary: '게시글 댓글 하위 댓글 생성' })
    @ApiCreatedResponse({ type : () => CreateCommentResponse})
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
