import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { UpdateSchedulesDto } from './dto/update-schedules.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from './entities/schedules.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {

  constructor(
    @InjectRepository(Schedules)
    private readonly schedulesRepository: Repository<Schedules>,
  ) { }

  async create(createSchedulesDto: CreateSchedulesDto) {
    try {
      const schedules = {
        title: createSchedulesDto.title,
        description: createSchedulesDto.description,
        date_initial: createSchedulesDto.date_initial,
        date_end: createSchedulesDto.date_end,
        type_work: { id: createSchedulesDto.type_work_id },
      };
      const newSchedules = this.schedulesRepository.create(schedules);
      await this.schedulesRepository.save(newSchedules);
      return newSchedules;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
        throw new ConflictException(`Erro ao criar o agendamento: Já existe.`);
      }
      throw error;
    }
  }

  async findAll() {
    const schedules = await this.schedulesRepository.find({
      order: {
        id: 'desc',
      },
    });
    return schedules;
  }

  async findOne(id: number) {
    const schedules = await this.schedulesRepository.findOne({ where: { id } });
    if (!schedules) {
      throw new NotFoundException(`Erro ao encontrar o agendamento: Agendamento não encontrado.`);
    }
    return schedules;
  }

  async update(id: number, updateSchedulesDto: UpdateSchedulesDto) {
    const dataSchedules = {
      title: updateSchedulesDto?.title,
      description: updateSchedulesDto?.description,
      date_initial: updateSchedulesDto?.date_initial,
      date_end: updateSchedulesDto?.date_end,
      ...(updateSchedulesDto?.type_work_id !== undefined && {
        type_work: { id: updateSchedulesDto.type_work_id },
      }),
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
