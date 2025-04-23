import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly content : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly author : string;
}