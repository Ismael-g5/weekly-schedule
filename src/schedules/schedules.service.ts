import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SchedulesEntity } from './entities/schedules.entity';
// o service é responsável por fazer a lógica de negócio, ele vai ser chamado pelo controller, que é o responsável por receber as requisições e enviar as respostas
@Injectable()
export class SchedulesService {
    private lastId = 1;
    private schedules: SchedulesEntity[] = [
        {
            id: 1,
            title: 'Schedule 1',
            description: 'Description 1',
            date_initial: new Date('2023-01-01'),
            date_end: new Date('2023-01-02')
        }
    ];

    findAll() {
        return this.schedules;
    }

    findOne(id: string){    
       const schedule =  this.schedules.find(item => item.id === +id); // o + converte number em string, e o find vai procurar o item que tenha o id igual ao id passado como parâmetro
        if (schedule) return schedule;
        throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND); // caso não encontre o item, lança uma exceção com o status 404
        // ou NotFoundException('Schedule not found'); // caso não encontre o item, lança uma exceção com o status 404
    }

    create(body: any){
        this.lastId++;
        const id = this.lastId;
        const newSchedule = {
            id,
            ...body,
        }
        this.schedules.push(newSchedule);

        return newSchedule
    }

    update(id: string, body: any){
        const scheduleIndexUpdate = this.schedules.findIndex(
            item => item.id === +id
        );

        if(scheduleIndexUpdate >= 0){
           const updatedSchedule = {
            ...this.schedules[scheduleIndexUpdate],
           };
        
           this.schedules[scheduleIndexUpdate] = {
            ...updatedSchedule,
            ...body,
           };
           return this.schedules[scheduleIndexUpdate];
        }
        //return { message: 'Schedule not found' };
    }

    remove(id: string){
        const scheduleIndex = this.schedules.findIndex(
            item => item.id === +id
        );

        if(scheduleIndex >= 0){
           this.schedules.splice(scheduleIndex, 1); // splice remove o item do array, o primeiro parâmetro é o índice do item que queremos remover, e o segundo parâmetro é a quantidade de itens que queremos remover
        }
    }

}