import { ScheduleItem } from 'src/schedule_items/entities/schedule_item.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Schedules {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'date' })
    date_initial?: Date;

    @Column({ type: 'date' })
    date_end?: Date;

    @OneToMany(() => ScheduleItem, (item) => item.schedule)
    items?: ScheduleItem[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}
