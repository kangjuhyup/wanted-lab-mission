import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentBody {
    @IsNotEmpty()
    @IsString()
    readonly content : string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly author : string;
}