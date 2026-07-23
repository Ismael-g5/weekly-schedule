// src/schedules/schedules.module.ts
import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesEntity } from './entities/schedules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchedulesEntity])], // Registra a entidade
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}