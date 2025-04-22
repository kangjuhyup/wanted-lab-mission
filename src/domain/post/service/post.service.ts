import { Injectable } from "@nestjs/common";
import { PostRepository } from "../repository/post.repository";
import { GetPostsQuery } from "../controller/v1/dto/request/get.posts";
import { PostEntity } from "@/database/entity/post.entity";
import { CreatePostBody } from "../controller/v1/dto/request/create.post";

@Injectable()
export class PostService {

    constructor(
        private readonly postRepository : PostRepository
    ) {}

    async getPosts(query: GetPostsQuery) {
        return await this.postRepository.selectMany({
            ...query,
            withComment: false
        });
    }

    async getPostsWithComments(query: GetPostsQuery) {
        return await this.postRepository.selectMany({
            ...query,
            withComment: true
        });
    }

    async getPost(postId:number) {
        return await this.postRepository.selectOne({ id: postId, withComment: false });
    }

    async getPostWithComments(postId:number) {
        return await this.postRepository.selectOne({ id: postId, withComment: true });
    }

    async createPost(body : CreatePostBody) {
        const post = PostEntity.of(body);
        await this.postRepository.insert(post);
        return post;
    }

    async updatePost(post: PostEntity, update : {
        title? : string,
        content? : string,
    }) {
        post.modify(update);
        await this.postRepository.update(post);
        return post;
    }

    async deletePost(post: PostEntity) {
        await this.postRepository.delete(post);
    }

}