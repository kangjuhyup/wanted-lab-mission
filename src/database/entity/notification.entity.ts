import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DefaultEntity } from "./default.entity";
import { NotificationType } from "@/common/enum/notification.enum";

@Entity()
export class NotificationEntity extends DefaultEntity {
    @PrimaryGeneratedColumn()
    notificationId : number;

    // target
    @Column()
    userName : string;

    @Column()
    type : NotificationType;

    @Column()
    message : string;

    @Column({ default : false })
    isRead : boolean;

    static of(param : {
        userName : string,
        type : NotificationType,
        message : string,
        isRead : boolean
    }) {
        const notification = new NotificationEntity();
        notification.userName = param.userName;
        notification.type = param.type;
        notification.message = param.message;
        notification.isRead = param.isRead;
        return notification;
    }
}
