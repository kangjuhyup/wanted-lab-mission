import { Injectable } from "@nestjs/common";
import { CommentService } from "./service/comment.service";
import { GetCommentsQuery } from "./controller/v1/dto/request/get.comments";
import { GetCommentsResponse } from "./controller/v1/dto/response/get.comments";
import { GetCommentChildrenQuery } from "./controller/v1/dto/request/get.comment.children";

@Injectable()
export class CommentFacade {

    constructor(
        private readonly commentService : CommentService
    ) {}

    async getComments(postId:number, query : GetCommentsQuery) {
        const totalCount = await this.commentService.count({ postId });
        const entities = await this.commentService.getComments(postId, query);
        return GetCommentsResponse.of(
            totalCount,
            entities
        );
    }

    async getCommentChildren(postId: number, commentId: number, query: GetCommentChildrenQuery) {
        //TODO : 하위 Depth 가 너무 깊어짐에 따른 성능 이슈 조심
        //TODO : 하위 Depth 내에 childs 가 너무 많을 경우 페이지네이션 필요
        const entities = await this.commentService.getCommentChilds(commentId);
        return GetCommentsResponse.of(
            entities.length,
            entities
        );
    }
}