import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import * as bcrypt from "bcrypt"; // 비밀번호 해싱을 위한 bcrypt 모듈 추가
import { CommentEntity } from "./comment.entity";
import { DefaultEntity } from "./default.entity";

@Entity()
export class PostEntity extends DefaultEntity {

    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    author: string;

    @Column()
    password: string;

    @OneToMany(() => CommentEntity, comment => comment.post, { nullable: true })
    comments?: CommentEntity[];
    
    static of(param : {
        title : string,
        content : string,
        author : string,
        password : string
    }) {
        const post = new PostEntity();
        post.title = param.title;
        post.content = param.content;
        post.author = param.author;
        post.setPassword(param.password);
        return post;
    }   

    private async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }

    async checkPassword(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.password);
    }

    async modify(param : {
        title? : string,
        content? : string
    }) {
        this.updatedAt = new Date();
        if(param.title) this.title = param.title;
        if(param.content) this.content = param.content;
    }
}