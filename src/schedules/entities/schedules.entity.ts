// src/schedules/entities/schedules.entity.ts
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity('schedules') // Nome da tabela no banco
export class SchedulesEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255 })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'date_initial', type: 'datetime' })
  date_initial?: Date;

  @Column({ name: 'date_end', type: 'datetime' })
  date_end?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}