import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.schedulesRepository.find({
      relations: {
        items: {
          type_work: true,
        },
      },
      order: {
        id: 'desc',
      },
    });
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
    return schedules;
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
