import { Injectable } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { NotificationService } from '../notification/service/notification.service';
import { CreateNotificationKeywordBody } from "./controller/v1/dto/request/create.notification.keyword";
import { CreateNotificationKeywordResponse } from "./controller/v1/dto/response/create.notification.keyword";
import { Transaction } from "@/database/transaction/transaction.decorator";
import { TransactionService } from "@/database/transaction/transaction.service";

@Injectable()
export class UserFacade {
    constructor(
        private readonly transactionService : TransactionService,
        private readonly userService : UserService,
        private readonly NotificationService : NotificationService,
    ){}

    @Transaction()
    async addNotificationKeyword(body: CreateNotificationKeywordBody) {
        const keyword = 
            await this.NotificationService.getKeyword(body.keyword) ?? 
            await this.NotificationService.createKeyword(body.keyword);
        
        const entity = await this.NotificationService.createNotificationKeyword(keyword.keywordId, body.userName);
        return CreateNotificationKeywordResponse.of(entity);
    }
}