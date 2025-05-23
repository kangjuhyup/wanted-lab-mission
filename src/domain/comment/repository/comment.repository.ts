import { CommentEntity } from "@/database/entity/comment.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from "@/database/transaction/transaction.repository";
import { Injectable } from "@nestjs/common";
import { FindOptionsWhere, MoreThan, Repository } from "typeorm";

@Injectable()
export class CommentRepository extends TransactionRepository<CommentEntity> {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly repo : Repository<CommentEntity>
    ) {
        super(repo);
    }

    async count(param : {
        postId : number,
        parentId? : number
    }) : Promise<number> {
        const where : FindOptionsWhere<CommentEntity> = {
            postId: param.postId
        }
        if (param.parentId) {
            where.parentId = param.parentId;
        }
        return await this.repository.count({
            where
        });
    }

    async selectManyWhere(param : {
        postId : number,
        cursor? : number,
        limit? : number,
        offset? : number
        withChild : boolean
    }) : Promise<CommentEntity[]> {
        const qb = this.getQueryBuilder('comment').select();
        
            qb.where({
                postId: param.postId
            });
        
        if (param.cursor) {
            qb.andWhere({
                commentId : MoreThan(param.cursor)
            })
        }
        if (param.limit) {
            qb.limit(param.limit);
        }

        
        if (!param.cursor && param.offset) {
            qb.offset(param.offset);
        }

        qb.andWhere('comment.parentId IS NULL');
        
        const comments = await qb.getMany();
        
        // 하위 댓글까지 모두 조회
        if(param.withChild) {
            for (const comment of comments) {
                await this.loadChildrenRecursively(comment);
            }
        }
        
        return comments;
    }

    async selectOneWhere(param : {
        id : number,
        withChild : boolean
    }) : Promise<CommentEntity | null> {
        const qb = this.getQueryBuilder('comment').select();
        
        if (param.id) {
            qb.where({
                commentId : param.id
            });
        }
        
        const comment = await qb.getOne();
        
        if (comment && param.withChild) {
            await this.loadChildrenRecursively(comment);
        }
        
        return comment;
    }

    async selectChild(parentId : number) {
        return await this.repository.find({ where: { parentId } });
    }
    
    /**
     * 댓글의 모든 하위 댓글 조회
     */
    private async loadChildrenRecursively(comment: CommentEntity): Promise<void> {
        const children = await this.repository.find({
            where: { parentId: comment.commentId }
        });
        
        if (children.length > 0) {
            comment.comments = children;
            
            for (const child of children) {
                await this.loadChildrenRecursively(child);
            }
        } else {
            comment.comments = [];
        }
    }

    async insert(entity : CommentEntity) {
        return await this.repository.insert(entity);
    }

    async delete(commentId : number) {
        return await this.repository.softDelete(commentId);
    }
}