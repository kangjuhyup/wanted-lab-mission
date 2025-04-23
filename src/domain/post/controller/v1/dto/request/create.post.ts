import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly author: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}