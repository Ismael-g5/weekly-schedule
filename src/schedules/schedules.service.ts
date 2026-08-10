import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { UpdateSchedulesDto } from './dto/update-schedules.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from './entities/schedules.entity';
import { ScheduleItem } from 'src/schedule_items/entities/schedule_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {

  constructor(
    @InjectRepository(Schedules)
    private readonly schedulesRepository: Repository<Schedules>,
  ) { }

  private static readonly DAY_NAMES = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ] as const;

  /**
   * day_of_week no banco: 0=Dom … 6=Sáb (padrão JS).
   * Ordenação desejada: Segunda → Domingo (1,2,3,4,5,6,0).
   */
  private mondayFirstRank(dayOfWeek: number): number {
    return dayOfWeek === 0 ? 7 : dayOfWeek;
  }

  private sortItemsMondayToSunday(items: ScheduleItem[] = []): ScheduleItem[] {
    return [...items].sort((a, b) => {
      const dayDiff =
        this.mondayFirstRank(a.day_of_week ?? 0) -
        this.mondayFirstRank(b.day_of_week ?? 0);
      if (dayDiff !== 0) return dayDiff;
      return (a.starts_at ?? '').localeCompare(b.starts_at ?? '');
    });
  }

  private withDayName(item: ScheduleItem) {
    const day = item.day_of_week ?? 0;
    return {
      ...item,
      day_name: SchedulesService.DAY_NAMES[day] ?? 'Desconhecido',
    };
  }

  private withSortedItems(schedule: Schedules) {
    return {
      ...schedule,
      items: this.sortItemsMondayToSunday(schedule.items).map((item) =>
        this.withDayName(item),
      ),
    };
  }

  async create(createSchedulesDto: CreateSchedulesDto) {
    const schedules = {
      title: createSchedulesDto.title,
      description: createSchedulesDto.description,
      date_initial: createSchedulesDto.date_initial,
      date_end: createSchedulesDto.date_end,
    };
    const newSchedules = this.schedulesRepository.create(schedules);
    await this.schedulesRepository.save(newSchedules);
    return newSchedules;
  }

  async findAll() {
    const schedules = await this.schedulesRepository.find({
      relations: {
        items: {
          type_work: true,
        },
      },
      order: {
        id: 'desc',
      },
    });
    return schedules.map((schedule) => this.withSortedItems(schedule));
  }

  async findOne(id: number) {
    const schedules = await this.schedulesRepository.findOne({
      where: { id },
      relations: {
        items: {
          type_work: true,
        },
      },
    });
    if (!schedules) {
      throw new NotFoundException(`Erro ao encontrar o agendamento: Agendamento não encontrado.`);
    }
    return this.withSortedItems(schedules);
  }

  async update(id: number, updateSchedulesDto: UpdateSchedulesDto) {
    const dataSchedules = {
      title: updateSchedulesDto?.title,
      description: updateSchedulesDto?.description,
      date_initial: updateSchedulesDto?.date_initial,
      date_end: updateSchedulesDto?.date_end,
    };

    const schedules = await this.schedulesRepository.preload({
      id,
      ...dataSchedules,
    });
    if (!schedules) {
      throw new NotFoundException(`Erro ao atualizar o agendamento: Agendamento não encontrado.`);
    }
    return this.schedulesRepository.save(schedules);
  }

  async remove(id: number) {
    const schedules = await this.schedulesRepository.findOne({ where: { id } });
    if (!schedules) {
      throw new NotFoundException(`Erro ao deletar o agendamento: Agendamento não encontrado.`);
    }
    return this.schedulesRepository.remove(schedules);
  }
}
