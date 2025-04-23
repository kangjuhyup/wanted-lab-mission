import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePostBody {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly content?: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}