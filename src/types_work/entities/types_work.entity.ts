import { ScheduleItem } from 'src/schedule_items/entities/schedule_item.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TypesWork {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    name?: string;

    @Column({ unique: true })
    type_event?: string;

    @OneToMany(() => ScheduleItem, (item) => item.type_work)
    schedule_items?: ScheduleItem[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}
