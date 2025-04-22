import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ResponseDto } from "src/common/dto/response.dto";
import { GetPostsQuery } from "./dto/request/get.posts";
import { PostFacade } from "../../post.facade";
import { PostAuthGuard } from "@/common/guard/post.author.guard";
import { CreatePostBody, PostIdParam } from "./dto/request/create.post";
import { UpdatePostBody } from "./dto/request/update.post";

@Controller('v1/posts')
export class PostController {

    constructor(
        private readonly postFacade : PostFacade
    ) {}

    @Get()
    async getPosts(@Query() query: GetPostsQuery) {
        return ResponseDto.Success(
            await this.postFacade.getPosts(query)
        );
    }

    @Post()
    async createPost(@Body() body: CreatePostBody) {
        return ResponseDto.Success(
            await this.postFacade.createPost(body)
        );
    }

    @Patch(':postId')
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