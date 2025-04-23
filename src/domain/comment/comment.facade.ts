import { Injectable } from "@nestjs/common";
import { CommentService } from "./service/comment.service";
import { GetCommentsQuery } from "./controller/v1/dto/request/get.comments";
import { GetCommentsResponse } from "./controller/v1/dto/response/get.comments";
import { GetCommentChildrenQuery } from "./controller/v1/dto/request/get.comment.children";
import { CreateCommentBody } from "./controller/v1/dto/request/create.comment";
import { CreateCommentResponse } from "./controller/v1/dto/response/create.comment";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { NotificationCommentPayload } from "../notification/payload/notification.comment.payload";

@Injectable()
export class CommentFacade {

    constructor(
        private readonly commentService : CommentService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async getComments(postId:number, query : GetCommentsQuery) {
        const totalCount = await this.commentService.count({ postId });
        const entities = await this.commentService.getComments(postId, query);
        return GetCommentsResponse.of(
            totalCount,
            entities
        );
    }

    async getCommentChildren(commentId: number) {
        //TODO : 하위 Depth 가 너무 깊어짐에 따른 성능 이슈 조심
        //TODO : 하위 Depth 내에 childs 가 너무 많을 경우 페이지네이션 필요
        const entities = await this.commentService.getCommentChilds(commentId);
        return GetCommentsResponse.of(
            entities.length,
            entities
        );
    }

    async createComment(
        param : {
            postId: number, commentId?: number, body: CreateCommentBody
        }) {
        const entity = await this.commentService.createComment(param);
        this.eventEmitter.emit('notification.comment.keyword', new NotificationCommentPayload(
            param.postId,
            entity.commentId,
            entity.content
        ));
        return CreateCommentResponse.of(entity);
    }
}