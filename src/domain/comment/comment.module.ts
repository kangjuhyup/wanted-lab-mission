import { Module } from "@nestjs/common";
import { CommentFacade } from "./comment.facade";
import { CommentController } from "./controller/v1/comment.controller";
import { CommentService } from "./service/comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "@/database/entity/comment.entity";
import { CommentRepository } from "./repository/comment.repository";

@Module({
    imports : [
        TypeOrmModule.forFeature([
            CommentEntity
        ])
    ],
    controllers : [
        CommentController
    ],
    providers : [
        CommentFacade,
        CommentService,
        CommentRepository
    ],
    exports : [
        CommentService
    ]
})
export class CommentModule {}