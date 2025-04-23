import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostBody {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}