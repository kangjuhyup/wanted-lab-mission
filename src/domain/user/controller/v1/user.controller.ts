import { ResponseDto } from "@/common/dto/response.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { UserFacade } from "../../user.facade";
import { CreateNotificationKeywordBody } from "./dto/request/create.notification.keyword";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { CreateNotificationKeywordResponse } from "./dto/response/create.notification.keyword";

@Controller('v1/users')
export class UserController {

    constructor(
        private readonly userFacade : UserFacade
    ) {}
 
    @Post('keyword')
    @ApiOperation({ summary: '알림 키워드 생성' })
    @ApiCreatedResponse({ type : () => CreateNotificationKeywordResponse})
    async addNotificationKeyword(@Body() body: CreateNotificationKeywordBody) {
        return ResponseDto.Success(
            await this.userFacade.addNotificationKeyword(body)
        );
    }
}