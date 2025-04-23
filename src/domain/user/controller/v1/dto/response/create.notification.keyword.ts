import { NotificationKeywordEntity } from "@/database/entity/notification.keyword.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationKeywordResponse {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    private userName : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    private keywordId : number;

    static of(entity : NotificationKeywordEntity) {
        const response = new CreateNotificationKeywordResponse();
        response.userName = entity.userName;
        response.keywordId = entity.keywordId;
        return response;
    }
}
