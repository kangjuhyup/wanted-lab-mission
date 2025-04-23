import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { KeywordEntity } from "./keyword.entity";

@Entity('tb_notification_keyword')
export class NotificationKeywordEntity {
    @PrimaryColumn()
    userName: string;

    @PrimaryColumn()
    keywordId: number;  

    @ManyToOne(() => KeywordEntity, keyword => keyword.notificationKeywords)
    @JoinColumn({name : 'keywordId'})
    keyword: KeywordEntity;

    static of(param : {
        userName : string,
        keywordId : number
    }) {
        const notificationKeyword = new NotificationKeywordEntity();
        notificationKeyword.userName = param.userName;
        notificationKeyword.keywordId = param.keywordId;
        return notificationKeyword;
    }
}