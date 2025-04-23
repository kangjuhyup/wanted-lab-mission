import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class GetCommentsQuery {
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly cursor : number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly limit : number;

    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly offset : number;
}