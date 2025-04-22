import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class DefaultEntity {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
    
}
