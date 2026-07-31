import { TypesWork } from 'src/types_work/entities/types_work.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Schedules {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'datetime' })
    date_initial?: Date;

    @Column({ type: 'datetime' })
    date_end?: Date;

    @ManyToOne(() => TypesWork, (typeWork) => typeWork.schedules)
    @JoinColumn({ name: 'type_work_id' })
    type_work?: TypesWork;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}
