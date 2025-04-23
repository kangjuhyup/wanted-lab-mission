import { PostEntity } from "@/database/entity/post.entity";

export class PostResponse {
    private id : number;
    private title : string;
    private author : string;
    private createdAt : Date;
    private updatedAt : Date;

    static of(param : PostEntity) {
        const response = new PostResponse();
        response.id = param.postId;
        response.title = param.title;
        response.author = param.author;
        response.createdAt = param.createdAt;
        response.updatedAt = param.updatedAt;
        return response;
    }
}

export class GetPostsResponse {
    private cursor : number;
    private totalCount : number;
    private posts : PostResponse[];

    static of(
        totalCount : number,
        posts : PostEntity[]
    ) {
        const response = new GetPostsResponse();
        response.cursor = posts[posts.length - 1]?.postId;
        response.totalCount = totalCount;
        response.posts = posts.map(PostResponse.of);
        return response;
    }
}