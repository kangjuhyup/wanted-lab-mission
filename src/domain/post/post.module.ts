import { Module } from "@nestjs/common";
import { CommentModule } from "../comment/comment.module";
import { PostController } from "./controller/v1/post.controller";
import { PostFacade } from "./post.facade";
import { PostService } from "./service/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "@/database/entity/post.entity";
import { PostRepository } from "./repository/post.repository";
import { TransactionService } from "@/database/transaction/transaction.service";

@Module({
    imports : [
        CommentModule,
        TypeOrmModule.forFeature([
            PostEntity
        ])
    ],
    controllers : [
        PostController
    ],
    providers : [
        TransactionService,
        PostFacade,
        PostService,
        PostRepository,
    ],
    exports : [
        PostService
    ]
})
export class PostModule {}