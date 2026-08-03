import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleItemDto } from './dto/create-schedule_item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleItem } from './entities/schedule_item.entity';
import { Repository } from 'typeorm';
import { SchedulesService } from 'src/schedules/schedules.service';
import { TypesWorkService } from 'src/types_work/types_work.service';

@Injectable()
export class ScheduleItemsService {

  constructor(
    @InjectRepository(ScheduleItem)
    private readonly scheduleItemsRepository: Repository<ScheduleItem>,
    private readonly schedulesService: SchedulesService,
    private readonly typesWorkService: TypesWorkService,
  ) { }

  async create(createScheduleItemDto: CreateScheduleItemDto) {
    await this.schedulesService.findOne(createScheduleItemDto.schedule_id!);
    await this.typesWorkService.findOne(createScheduleItemDto.type_work_id!);

    const item = this.scheduleItemsRepository.create({
      title: createScheduleItemDto.title,
      description: createScheduleItemDto.description,
      day_of_week: createScheduleItemDto.day_of_week,
      starts_at: createScheduleItemDto.starts_at,
      ends_at: createScheduleItemDto.ends_at,
      schedule: { id: createScheduleItemDto.schedule_id },
      type_work: { id: createScheduleItemDto.type_work_id },
    });

    await this.scheduleItemsRepository.save(item);
    return this.findOne(item.id!);
  }

  async findAll() {
    return this.scheduleItemsRepository.find({
      relations: {
        schedule: true,
        type_work: true,
      },
      order: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const item = await this.scheduleItemsRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
        type_work: true,
      },
    });
    if (!item) {
      throw new NotFoundException(`Erro ao encontrar o item da escala: Item não encontrado.`);
    }
    return item;
  }

  async update(id: number, updateScheduleItemDto: UpdateScheduleItemDto) {
    if (updateScheduleItemDto.schedule_id !== undefined) {
      await this.schedulesService.findOne(updateScheduleItemDto.schedule_id);
    }
    if (updateScheduleItemDto.type_work_id !== undefined) {
      await this.typesWorkService.findOne(updateScheduleItemDto.type_work_id);
    }

    const dataItem = {
      title: updateScheduleItemDto?.title,
      description: updateScheduleItemDto?.description,
      day_of_week: updateScheduleItemDto?.day_of_week,
      starts_at: updateScheduleItemDto?.starts_at,
      ends_at: updateScheduleItemDto?.ends_at,
      ...(updateScheduleItemDto?.schedule_id !== undefined && {
        schedule: { id: updateScheduleItemDto.schedule_id },
      }),
      ...(updateScheduleItemDto?.type_work_id !== undefined && {
        type_work: { id: updateScheduleItemDto.type_work_id },
      }),
    };

    const item = await this.scheduleItemsRepository.preload({
      id,
      ...dataItem,
    });
    if (!item) {
      throw new NotFoundException(`Erro ao atualizar o item da escala: Item não encontrado.`);
    }

    await this.scheduleItemsRepository.save(item);
    return this.findOne(id);
  }

  async remove(id: number) {
    const item = await this.scheduleItemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Erro ao deletar o item da escala: Item não encontrado.`);
    }
    return this.scheduleItemsRepository.remove(item);
  }
}
