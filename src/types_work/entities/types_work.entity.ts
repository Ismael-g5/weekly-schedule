import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TypesWork {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    name?: string;

    @Column({unique: true})
    type_event?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}

