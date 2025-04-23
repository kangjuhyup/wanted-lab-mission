import { PostEntity } from "@/database/entity/post.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePostResponse {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private id : number;
    static of(postId : number) {
        const response = new CreatePostResponse();
        response.id = postId;
        return response;
    }
}