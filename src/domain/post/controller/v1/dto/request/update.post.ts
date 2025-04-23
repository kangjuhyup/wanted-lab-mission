import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePostBody {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    readonly title?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly content?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}