import { Injectable, NotFoundException } from "@nestjs/common";
import { PostService } from "./service/post.service";
import { GetPostsQuery } from "./controller/v1/dto/request/get.posts";
import { Transaction } from "@/database/transaction/transaction.decorator";
import { CreatePostBody } from "./controller/v1/dto/request/create.post";
import { GetPostsResponse } from "./controller/v1/dto/response/get.posts";
import { CreatePostResponse } from "./controller/v1/dto/response/create.post";
import { UpdatePostBody } from "./controller/v1/dto/request/update.post";
import { CommentService } from "../comment/service/comment.service";

@Injectable()
export class PostFacade {
    constructor(
        private readonly postService : PostService,
        private readonly commentService : CommentService
    ) {}

    async getPosts(query: GetPostsQuery) {
        const entities = await this.postService.getPosts(query);
        return GetPostsResponse.of(
            entities.length,
            entities
        );
    }

    @Transaction()
    async createPost(body : CreatePostBody) {
        const entity = await this.postService.createPost(body);
        return CreatePostResponse.of(entity.id);
    }

    @Transaction()
    async updatePost(postId : number, body : UpdatePostBody) {
        const post = await this.postService.getPostWithComments(postId);
        if(!post) {
            throw new NotFoundException('게시글을 찾을 수 없습니다.');
        }
        const entity = await this.postService.updatePost(post, body);
        return CreatePostResponse.of(entity.id);
    }

    @Transaction()
    async deletePost(postId : number) {
        const post = await this.postService.getPostWithComments(postId);
        if(!post) {
            throw new NotFoundException('게시글을 찾을 수 없습니다.');
        }
        await this.postService.deletePost(post);
        post.comments?.forEach(async (comment) => {
            await this.commentService.deleteComment(comment.id);
        });
        return;
    }
}