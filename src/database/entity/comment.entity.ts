import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { PostEntity } from "./post.entity";
import { DefaultEntity } from "./default.entity";

@Entity('tb_comment')
export class CommentEntity extends DefaultEntity {

    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    content: string;

    @Column()
    author: string;

    @Column()
    postId: number;

    @Column()
    parentId : number;

    @OneToMany(() => CommentEntity, comment => comment.parentId, { nullable: true })
    comments?: CommentEntity[];

    @ManyToOne(() => CommentEntity, comment => comment.comments)
    @JoinColumn({ name: 'parentId' })
    parent?: CommentEntity;

    @ManyToOne(() => PostEntity, post => post.comments)
    @JoinColumn({ name: 'postId' })
    post: PostEntity;

    static of(param : {
        postId : number,
        parentId? : number,
        content : string,
        author : string
    }) {
        const comment = new CommentEntity();
        comment.postId = param.postId;
        comment.content = param.content;
        comment.author = param.author;
        if (param.parentId) {
            comment.parentId = param.parentId;
        }
        return comment;
    }

    softDelete() {
        this.deletedAt = new Date();
    }
    
}
