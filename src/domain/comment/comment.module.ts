import { Module } from "@nestjs/common";
import { CommentFacade } from "./comment.facade";
import { CommentController } from "./controller/v1/comment.controller";
import { CommentService } from "./service/comment.service";

@Module({
    controllers : [
        CommentController
    ],
    providers : [
        CommentFacade,
        CommentService
    ],
    exports : [
        CommentService
    ]
})
export class CommentModule {}