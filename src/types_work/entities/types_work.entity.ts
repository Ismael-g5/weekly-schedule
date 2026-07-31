import { Schedules } from 'src/schedules/entities/schedules.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TypesWork {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    name?: string;

    @Column({unique: true})
    type_event?: string;

    @OneToMany(() => Schedules, (schedule) => schedule.type_work)
    schedules?: Schedules[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}

