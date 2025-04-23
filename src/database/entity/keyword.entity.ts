import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DefaultEntity } from "./default.entity";
import { NotificationKeywordEntity } from "./notification.keyword.entity";

@Entity('tb_keyword')
export class KeywordEntity extends DefaultEntity {

    @PrimaryGeneratedColumn()
    keywordId : number;

    @Column()
    keyword : string;

    @OneToMany(() => NotificationKeywordEntity, notificationKeyword => notificationKeyword.keyword)
    notificationKeywords : NotificationKeywordEntity[];

    
    static of(param : {keyword : string}) {
        const keyword = new KeywordEntity();
        keyword.keyword = param.keyword;
        return keyword;
    }
}
