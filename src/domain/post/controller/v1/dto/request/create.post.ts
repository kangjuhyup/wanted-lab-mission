import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostBody {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}