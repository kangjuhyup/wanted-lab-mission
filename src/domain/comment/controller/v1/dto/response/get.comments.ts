import { CommentEntity } from "@/database/entity/comment.entity";

export class CommentResponse {
    private id : number;
    private content : string;
    private author : string;
    private createdAt : Date;
    private updatedAt : Date;

    static of(entity:CommentEntity) {
        const comment = new CommentResponse();
        comment.id = entity.commentId;
        comment.content = entity.content;
        comment.author = entity.author;
        comment.createdAt = entity.createdAt;
        comment.updatedAt = entity.updatedAt;
        return comment;
    }
}

export class GetCommentsResponse {
    private cursor: number;
    private totalCount : number;
    private comments : CommentResponse[];

    static of(
        totalCount : number,
        entities : CommentEntity[]
    ) {
        const response = new GetCommentsResponse();
        response.totalCount = totalCount;
        response.comments = entities.map(entity => CommentResponse.of(entity));
        return response;
    }
}