import { Module } from "@nestjs/common";
import { NotificationService } from "./service/notification.service";
import { NotificationListener } from "./notification.listener";

@Module({
    providers : [
        NotificationService,
        NotificationListener
    ]
})
export class NotificationModule {}