import { CommentEntity } from "@/database/entity/comment.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CommentResponse {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private id : number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    private content : string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    private author : string;
    @ApiProperty()
    @IsNotEmpty()
    private createdAt : Date;
    @ApiProperty()
    @IsNotEmpty()
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
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private cursor: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private totalCount : number;
    @ApiProperty({ type: () => [CommentResponse] })
    @Type(() => CommentResponse)
    @IsNotEmpty()
    @ValidateNested({ each: true })
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