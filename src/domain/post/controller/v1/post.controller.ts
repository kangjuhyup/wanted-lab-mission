import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ResponseDto } from "@common/dto/response.dto";
import { GetPostsQuery } from "./dto/request/get.posts";
import { PostFacade } from "../../post.facade";
import { PostAuthGuard } from "@/common/guard/post.author.guard";
import { CreatePostBody } from "./dto/request/create.post";
import { UpdatePostBody } from "./dto/request/update.post";
import { PostIdParam } from "./dto/request/post";
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetPostsResponse } from "./dto/response/get.posts";
import { CreatePostResponse } from "./dto/response/create.post";

@Controller('v1/posts')
export class PostController {

    constructor(
        private readonly postFacade : PostFacade
    ) {}

    @Get()
    @ApiOperation({ summary: '게시글 목록 조회' })
    @ApiOkResponse({ type : () => GetPostsResponse})
    async getPosts(@Query() query: GetPostsQuery) {
        return ResponseDto.Success(
            await this.postFacade.getPosts(query)
        );
    }

    @Post()
    @ApiOperation({ summary: '게시글 생성' })
    @ApiCreatedResponse({ type : () => CreatePostResponse})
    async createPost(@Body() body: CreatePostBody) {
        return ResponseDto.Success(
            await this.postFacade.createPost(body)
        );
    }

    
    @Patch(':postId')
    @ApiOperation({ summary: '게시글 수정' })
    @ApiNoContentResponse()
    @HttpCode(204)
    @UseGuards(PostAuthGuard)
    async updatePost(
        @Param() postIdParam: PostIdParam,
        @Body() body: UpdatePostBody
    ) {
        return ResponseDto.Success(
            await this.postFacade.updatePost(
                postIdParam.postId,
                {
                    title: body.title,
                    content: body.content,
                    password: body.password
                }
            )
        );
    }

    @Delete()
    @ApiOperation({ summary: '게시글 삭제' })
    @ApiNoContentResponse()
    @HttpCode(204)
    @UseGuards(PostAuthGuard)
    async deletePost(
        @Param() postIdParam: PostIdParam
    ) {
        return ResponseDto.Success(
            await this.postFacade.deletePost(postIdParam.postId)
        );
    }
}