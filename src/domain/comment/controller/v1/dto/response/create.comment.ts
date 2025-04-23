import { CommentEntity } from "@/database/entity/comment.entity";

export class CreateCommentResponse {
    private id : number;

    static of(entity:CommentEntity) {
        const response = new CreateCommentResponse();
        response.id = entity.commentId;
        return response;
    }
}