import { NotificationEntity } from "@/database/entity/notification.entity";
import { Injectable } from "@nestjs/common";
import { NotificationKeywordRepository } from "../repository/notification.keyword.repository";
import { NotificationRepository } from "../repository/notification.repository";
import { NotificationKeywordEntity } from "@/database/entity/notification.keyword.entity";
import { getNotificationTypeText } from '../../../common/enum/notification.enum';
import { NotificationTypeRepository } from "../repository/notification.type.repository";

@Injectable()
export class NotificationService {
    constructor(
        private readonly notificationKeywordRepository : NotificationKeywordRepository,
        private readonly notificationRepository : NotificationRepository,
        private readonly notificationTypeRepository : NotificationTypeRepository
    ) {}

    async findKeywords(text:string) {
        return await this.notificationKeywordRepository.selectWhere({
            withKeyword: { text }
        });
    }

    async createNotifications(typeId : number, notifcationKeywords : NotificationKeywordEntity[]) {
        const notificationType = await this.notificationTypeRepository.selectWhere({
            notificationTypeId : typeId
        });
        if(!notificationType) {
            throw new Error('해당 타입의 알림을 찾을 수 없습니다.');
        }
        const entities = notifcationKeywords.map((notificationKeyword) => {
            return NotificationEntity.of({
                userName : notificationKeyword.userName,
                typeId : notificationType.notificationTypeId,
                message : `"${notificationKeyword.keyword.keyword}" 키워드가 포함된 ${getNotificationTypeText(notificationType.notificationType)}이 등록되었습니다.`,
            });
        });
        const chunkSize = 1000;
        for (let i = 0; i < entities.length; i += chunkSize) {
            const chunk = entities.slice(i, i + chunkSize);
            await this.notificationRepository.insertMany(chunk);
        }
    }
}