import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class GetPostsQuery {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(20)
    readonly author? : string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    readonly title? : string;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    readonly cursor? : number;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly limit? : number;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly offset? : number;
}