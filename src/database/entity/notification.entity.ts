import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DefaultEntity } from "./default.entity";
import { NotificationType } from "@/common/enum/notification.enum";
import { NotificationTypeEntity } from "./notification.type.entity";

@Entity()
export class NotificationEntity extends DefaultEntity {
    @PrimaryGeneratedColumn()
    notificationId : number;

    // target
    @Column()
    userName : string;

    @Column()
    typeId : number;

    @ManyToOne(() => NotificationTypeEntity, notificationType => notificationType.notifications)
    @JoinColumn({name : 'typeId'})
    type : NotificationTypeEntity;

    @Column()
    message : string;

    @Column({ default : false })
    isRead : boolean;

    static of(param : {
        userName : string,
        typeId : number,
        message : string,
    }) {
        const notification = new NotificationEntity();
        notification.userName = param.userName;
        notification.typeId = param.typeId;
        notification.message = param.message;
        return notification;
    }
}
