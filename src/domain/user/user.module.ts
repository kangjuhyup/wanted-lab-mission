import { Module } from "@nestjs/common";
import { NotificationModule } from "../notification/notification.module";
import { TransactionService } from "@/database/transaction/transaction.service";
import { UserController } from "./controller/v1/user.controller";
import { UserService } from "./service/user.service";
import { UserFacade } from "./user.facade";

@Module({
    imports : [
        NotificationModule,
    ],
    providers : [
        UserFacade,
        UserService,
        TransactionService,
    ],
    controllers : [
        UserController,
    ],
    exports : [
        UserService,
    ]
})
export class UserModule {}
