import { PostEntity } from "@/database/entity/post.entity";

export class CreatePostResponse {
    private id : number;
    static of(postId : number) {
        const response = new CreatePostResponse();
        response.id = postId;
        return response;
    }
}