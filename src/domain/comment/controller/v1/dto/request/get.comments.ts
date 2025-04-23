import { OnlyOneOfConstraint } from "@/common/pipe/cursor.offset.pipe";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Min, Validate } from "class-validator";

export class GetCommentsQuery {
    @Validate(OnlyOneOfConstraint, ['offset'], { message: 'cursor와 offset 중 하나만 제공해야 합니다.' })
    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly cursor? : number;

    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly limit : number;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly offset? : number;
}