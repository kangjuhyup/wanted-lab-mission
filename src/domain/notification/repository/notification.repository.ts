import { NotificationEntity } from "@/database/entity/notification.entity";
import { TransactionRepository } from "@/database/transaction/transaction.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class NotificationRepository extends TransactionRepository<NotificationEntity> {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly repo: Repository<NotificationEntity>,
    ) {
        super(repo);
    }

    async insertMany(entities : NotificationEntity[]) {
        const qb = this.repository.createQueryBuilder();
        return await qb.insert().values(entities).execute();
    }
}