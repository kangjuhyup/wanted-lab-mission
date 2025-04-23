import { Module } from "@nestjs/common";
import { NotificationService } from "./service/notification.service";
import { NotificationListener } from "./notification.listener";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "@/database/entity/notification.entity";
import { NotificationKeywordEntity } from "@/database/entity/notification.keyword.entity";
import { NotificationTypeEntity } from "@/database/entity/notification.type.entity";
import { NotificationKeywordRepository } from "./repository/notification.keyword.repository";
import { NotificationRepository } from "./repository/notification.repository";
import { NotificationTypeRepository } from "./repository/notification.type.repository";

@Module({
    imports : [
        TypeOrmModule.forFeature([
            NotificationEntity,
            NotificationKeywordEntity,
            NotificationTypeEntity
        ])
    ],
    providers : [
        NotificationService,
        NotificationListener,
        NotificationKeywordRepository,
        NotificationRepository,
        NotificationTypeRepository
    ]
})
export class NotificationModule {}