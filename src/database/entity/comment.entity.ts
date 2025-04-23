import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { PostEntity } from "./post.entity";
import { DefaultEntity } from "./default.entity";

@Entity()
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
        content : string,
        author : string
    }) {
        const comment = new CommentEntity();
        comment.content = param.content;
        comment.author = param.author;
        return comment;
    }

    softDelete() {
        this.deletedAt = new Date();
    }
    
}
