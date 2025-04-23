import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationKeywordBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly userName : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly keyword : string;
}
