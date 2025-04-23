import { Module } from "@nestjs/common";
import { CommentModule } from "../comment/comment.module";
import { PostController } from "./controller/v1/post.controller";
import { PostFacade } from "./post.facade";
import { PostService } from "./service/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "@/database/entity/post.entity";
import { PostRepository } from "./repository/post.repository";

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
        PostFacade,
        PostService,
        PostRepository,
    ],
    exports : [
        PostService
    ]
})
export class PostModule {}