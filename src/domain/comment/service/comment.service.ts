import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../repository/comment.repository";
import { CreateCommentBody } from "../controller/v1/dto/request/create.comment";
import { CommentEntity } from "@/database/entity/comment.entity";
import { GetCommentsQuery } from "../controller/v1/dto/request/get.comments";

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository : CommentRepository
    ) {}

    async count(param : {
        postId : number,
        parentId? : number
    }) : Promise<number> {
        return await this.commentRepository.count(param);
    }

    async getComments(postId : number, query? : GetCommentsQuery) {
        return await this.commentRepository.selectManyWhere({ postId, withChild: false, ...query });
    }

    async getCommentChilds(commentId : number) {
        return await this.commentRepository.selectChild(commentId);
    }

    async createComment(body : CreateCommentBody) 
    {
        const comment = CommentEntity.of(body);
        return await this.commentRepository.insert(comment);
    }

    async deleteComment(commentId : number) {
        await this.commentRepository.delete(commentId);
    }
}