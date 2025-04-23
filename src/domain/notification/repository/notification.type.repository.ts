import { NotificationTypeEntity } from "@/database/entity/notification.type.entity";
import { TransactionRepository } from "@/database/transaction/transaction.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class NotificationTypeRepository extends TransactionRepository<NotificationTypeEntity> {

    constructor(
        @InjectRepository(NotificationTypeEntity)
        private readonly repo: Repository<NotificationTypeEntity>,
    ) {
        super(repo);
    }

    async selectWhere(param : {
        notificationTypeId : number
    }) {
        return await this.repository.findOne({
            where : {
                notificationTypeId : param.notificationTypeId
            }
        })
    }
}