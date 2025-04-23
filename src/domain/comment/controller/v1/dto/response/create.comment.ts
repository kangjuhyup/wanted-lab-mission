import { CommentEntity } from "@/database/entity/comment.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommentResponse {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private id : number;

    static of(entity:CommentEntity) {
        const response = new CreateCommentResponse();
        response.id = entity.commentId;
        return response;
    }
}