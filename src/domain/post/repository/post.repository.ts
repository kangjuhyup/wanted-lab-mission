import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager, EntityTarget, Like } from "typeorm";
import { PostEntity } from "../../../database/entity/post.entity";
import { TransactionRepository } from "@/database/transaction/transaction.repository";

@Injectable()
export class PostRepository extends TransactionRepository<PostEntity> {
    
    protected getEntityClass(): EntityTarget<PostEntity> {
        return PostEntity;
    }
  
    constructor(
        @InjectRepository(PostEntity)
        private readonly repo: Repository<PostEntity>,
    ){
        super();
    }

    async selectMany(param : {
        author? : string,
        title? : string,
        cursor? : number,
        limit? : number,
        offset? : number,
        withComment : boolean
    }) {
        const qb = this.getQueryBuilder('post').select();
        
        if (param.author) {
            qb.andWhere('post.author = :author', { author: param.author });
        }
        if (param.title) {
            qb.andWhere('post.title = :title', { title: Like(`%${param.title}%`) });
        }
        if (param.cursor) {
            qb.andWhere('post.id < :cursor', { cursor: param.cursor });
        }
        if (param.limit) {
            qb.limit(param.limit);
        }
        if (param.offset) {
            qb.offset(param.offset);
        }
        
        if(param.withComment) {
            qb.leftJoinAndSelect('post.comments', 'comment');
        }

        return await qb.getMany();
    }

    async selectOne(param : {
        id : number,
        withComment : boolean
    }) {
        const qb = this.getQueryBuilder('post').select();
        
        qb.where('post.id = :id', { id: param.id });
        
        if(param.withComment) {
            qb.leftJoinAndSelect('post.comments', 'comment');
        }
        
        return await qb.getOne();
    }
    
    async insert(post: PostEntity) {
        return await this.repository.insert(post);
    }

    async update(post: PostEntity) {
        return await this.repository.update(post.id, post);
    }

    async delete(post: PostEntity) {
        return await this.repository.softDelete(post.id);
    }
}