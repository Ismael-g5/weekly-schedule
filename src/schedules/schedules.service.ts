// src/schedules/schedules.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchedulesEntity } from './entities/schedules.entity';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { UpdateSchedulesDto } from './dto/update-schedules.dto';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(SchedulesEntity)
        private schedulesRepository: Repository<SchedulesEntity>,
    ) {}

    // Buscar todos os agendamentos
    async findAll(): Promise<SchedulesEntity[]> {
        return this.schedulesRepository.find({
            order: {
                date_initial: 'ASC',
            },
        });
    }

    // Buscar um agendamento por ID
    async findOne(id: number): Promise<SchedulesEntity> {
        const schedule = await this.schedulesRepository.findOne({
            where: { id },
        });
        
        if (!schedule) {
            throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
        }
        
        return schedule;
    }

    // Criar novo agendamento
    async create(createScheduleDto: CreateSchedulesDto): Promise<SchedulesEntity> {
        // Valida se os campos obrigatórios estão presentes
        if (!createScheduleDto.title) {
            throw new BadRequestException('Título é obrigatório');
        }

        if (!createScheduleDto.date_initial) {
            throw new BadRequestException('Data inicial é obrigatória');
        }

        if (!createScheduleDto.date_end) {
            throw new BadRequestException('Data final é obrigatória');
        }

        // Converte as datas de string para Date com verificação de undefined
        const dateInitial = new Date(createScheduleDto.date_initial);
        const dateEnd = new Date(createScheduleDto.date_end);

        // Verifica se as datas são válidas
        if (isNaN(dateInitial.getTime())) {
            throw new BadRequestException('Data inicial inválida');
        }

        if (isNaN(dateEnd.getTime())) {
            throw new BadRequestException('Data final inválida');
        }

        // Valida se a data inicial é menor que a data final
        if (dateInitial >= dateEnd) {
            throw new BadRequestException('Data inicial deve ser menor que a data final');
        }

        const scheduleData = {
            title: createScheduleDto.title,
            description: createScheduleDto.description || '',
            date_initial: dateInitial,
            date_end: dateEnd,
        };

        const newSchedule = this.schedulesRepository.create(scheduleData);
        return this.schedulesRepository.save(newSchedule);
    }

    // Atualizar um agendamento
    async update(id: number, updateScheduleDto: UpdateSchedulesDto): Promise<SchedulesEntity> {
        // Verifica se o agendamento existe
        await this.findOne(id);

        // Prepara os dados para atualização
        const updateData: any = {};

        // Atualiza apenas os campos fornecidos
        if (updateScheduleDto.title !== undefined) {
            updateData.title = updateScheduleDto.title;
        }

        if (updateScheduleDto.description !== undefined) {
            updateData.description = updateScheduleDto.description;
        }

        // Converte e valida datas se fornecidas
        if (updateScheduleDto.date_initial !== undefined) {
            const dateInitial = new Date(updateScheduleDto.date_initial);
            if (isNaN(dateInitial.getTime())) {
                throw new BadRequestException('Data inicial inválida');
            }
            updateData.date_initial = dateInitial;
        }

        if (updateScheduleDto.date_end !== undefined) {
            const dateEnd = new Date(updateScheduleDto.date_end);
            if (isNaN(dateEnd.getTime())) {
                throw new BadRequestException('Data final inválida');
            }
            updateData.date_end = dateEnd;
        }

        // Valida datas se ambas foram fornecidas
        if (updateData.date_initial && updateData.date_end) {
            if (updateData.date_initial >= updateData.date_end) {
                throw new BadRequestException('Data inicial deve ser menor que a data final');
            }
        }

        // Se não há dados para atualizar
        if (Object.keys(updateData).length === 0) {
            throw new BadRequestException('Nenhum dado para atualizar');
        }

        // Atualiza o registro
        await this.schedulesRepository.update(id, updateData);
        
        // Retorna o registro atualizado
        return this.findOne(id);
    }

    // Remover um agendamento
    async remove(id: number): Promise<void> {
        const result = await this.schedulesRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
        }
    }

    // Métodos adicionais úteis

    // Buscar agendamentos por período
    async findByDateRange(startDate: Date, endDate: Date): Promise<SchedulesEntity[]> {
        return this.schedulesRepository
            .createQueryBuilder('schedule')
            .where('schedule.date_initial >= :startDate', { startDate })
            .andWhere('schedule.date_end <= :endDate', { endDate })
            .orderBy('schedule.date_initial', 'ASC')
            .getMany();
    }

    // Buscar agendamentos futuros
    async findUpcoming(): Promise<SchedulesEntity[]> {
        const now = new Date();
        return this.schedulesRepository
            .createQueryBuilder('schedule')
            .where('schedule.date_initial >= :now', { now })
            .orderBy('schedule.date_initial', 'ASC')
            .getMany();
    }

    // Contar agendamentos
    async count(): Promise<number> {
        return this.schedulesRepository.count();
    }
}