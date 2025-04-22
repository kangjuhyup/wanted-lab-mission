import { CommentEntity } from "@/database/entity/comment.entity";
import { TransactionRepository } from "@/database/transaction/transaction.repository";
import { Injectable } from "@nestjs/common";
import { EntityTarget, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CommentRepository extends TransactionRepository<CommentEntity> {

    constructor(
        private readonly commentRepository : Repository<CommentEntity>
    ) {
        super();
    }

    getEntityClass() : EntityTarget<CommentEntity> {
        return CommentEntity;
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
        return await this.commentRepository.count({
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
        
        if (param.postId) {
            qb.andWhere('comment.postId = :postId', { postId: param.postId });
        }
        
        if (param.cursor) {
            qb.andWhere('comment.id < :cursor', { cursor: param.cursor });
        }
        
        if (param.limit) {
            qb.limit(param.limit);
        }
        
        if (param.offset) {
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
            qb.andWhere('comment.id = :id', { id: param.id });
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
            where: { parentId: comment.id }
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
        return await this.commentRepository.insert(entity);
    }

    async delete(commentId : number) {
        return await this.commentRepository.softDelete(commentId);
    }
}