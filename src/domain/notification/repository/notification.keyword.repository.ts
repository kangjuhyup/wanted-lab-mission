import { NotificationKeywordEntity } from "@/database/entity/notification.keyword.entity";
import { TransactionRepository } from "@/database/transaction/transaction.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class NotificationKeywordRepository extends TransactionRepository<NotificationKeywordEntity> {
    
    constructor(
        @InjectRepository(NotificationKeywordEntity)
        private readonly repo: Repository<NotificationKeywordEntity>,
    ) {
        super(repo);
    }

    async selectWhere(param : {
        withKeyword? : {
            text : string
        }
    }) {
        const qb = this.repository.createQueryBuilder('notificationKeyword');
        if(param.withKeyword) {
            qb.innerJoinAndSelect('notificationKeyword.keyword', 'keyword');
            qb.where('POSITION(keyword.keyword IN :text) > 0', { text: param.withKeyword.text });
        }
        return qb.getMany();
    }
    
}