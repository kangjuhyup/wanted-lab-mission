import { Module } from "@nestjs/common";
import { CommentModule } from "../comment/comment.module";
import { PostController } from "./controller/v1/post.controller";
import { PostFacade } from "./post.facade";
import { PostService } from "./service/post.service";

@Module({
    imports : [
        CommentModule
    ],
    controllers : [
        PostController
    ],
    providers : [
        PostFacade,
        PostService
    ],
    exports : [
        PostService
    ]
})
export class PostModule {}