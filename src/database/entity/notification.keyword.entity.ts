import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { DefaultEntity } from "./default.entity";
import { KeywordEntity } from "./keyword.entity";

@Entity()
export class NotificationKeywordEntity extends DefaultEntity {
    @PrimaryColumn()
    userName: string;

    @PrimaryColumn()
    keywordId: number;  

    @ManyToOne(() => KeywordEntity, keyword => keyword.notificationKeywords)
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