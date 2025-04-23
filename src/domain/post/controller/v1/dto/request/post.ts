import { Transform } from "class-transformer";
import { IsNotEmpty, Min } from "class-validator";

export class PostIdParam {
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @Min(1)
    readonly postId: number;
}
    