import { Module } from "@nestjs/common";
import { CommentModule } from "./comment/comment.module";
import { PostModule } from "./post/post.module";

@Module({
    imports : [
        CommentModule,
        PostModule
    ]
})
export class RouterModule {}