import { Schedules } from 'src/schedules/entities/schedules.entity';
import { TypesWork } from 'src/types_work/entities/types_work.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('schedule_items')
export class ScheduleItem {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Schedules, (schedule) => schedule.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'schedule_id' })
    schedule?: Schedules;

    @ManyToOne(() => TypesWork, (typeWork) => typeWork.schedule_items)
    @JoinColumn({ name: 'type_work_id' })
    type_work?: TypesWork;

    @Column({ type: 'tinyint' })
    day_of_week?: number;

    @Column()
    title?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'time', nullable: true })
    starts_at?: string;

    @Column({ type: 'time', nullable: true })
    ends_at?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}
