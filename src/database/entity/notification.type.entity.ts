import { NotificationType } from "@/common/enum/notification.enum";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "./notification.entity";

export class NotificationTypeEntity {
    @PrimaryGeneratedColumn()
    notificationTypeId : number;

    @Column()
    notificationType : NotificationType;

    @OneToMany(() => NotificationEntity, notification => notification.type, { nullable : true })
    notifications? : NotificationEntity[];
}
