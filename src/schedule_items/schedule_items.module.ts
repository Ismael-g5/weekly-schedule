import { Module } from '@nestjs/common';
import { ScheduleItemsService } from './schedule_items.service';
import { ScheduleItemsController } from './schedule_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleItem } from './entities/schedule_item.entity';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { TypesWorkModule } from 'src/types_work/types_work.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleItem]),
    SchedulesModule,
    TypesWorkModule,
  ],
  controllers: [ScheduleItemsController],
  providers: [ScheduleItemsService],
})
export class ScheduleItemsModule {}
