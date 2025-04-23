import { NotificationType } from "@/common/enum/notification.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "./notification.entity";

@Entity('tb_notification_type')
export class NotificationTypeEntity {
    @PrimaryGeneratedColumn()
    notificationTypeId : number;

    @Column()
    notificationType : NotificationType;

    @OneToMany(() => NotificationEntity, notification => notification.type, { nullable : true })
    notifications? : NotificationEntity[];
}
