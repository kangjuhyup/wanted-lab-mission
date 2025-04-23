import { PostEntity } from "@/database/entity/post.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class PostResponse {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private id : number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    private title : string;
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
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private cursor : number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private totalCount : number;
    @ApiProperty({ type: () => [PostResponse] })
    @Type(() => PostResponse)
    @IsNotEmpty()
    @ValidateNested({ each: true })
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