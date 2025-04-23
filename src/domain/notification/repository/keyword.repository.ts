import { KeywordEntity } from "@/database/entity/keyword.entity";
import { TransactionRepository } from "@/database/transaction/transaction.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class KeywordRepository extends TransactionRepository<KeywordEntity> {
    constructor(
        @InjectRepository(KeywordEntity) private readonly repo : Repository<KeywordEntity>
    ) {
        super(repo);
    }

    async selectWhere(param : {
        keyword : string
    }) {
        return await this.repository.findOne({
            where : {
                keyword : param.keyword
            }
        });
    }

    async insert(keyword : KeywordEntity) {
        return await this.repository.insert(keyword);
    }
}