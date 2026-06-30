import { Controller, Get, Param, Post, Body, Patch, Delete, Put } from '@nestjs/common';
import { SchedulesService } from './schedules.service';


@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}
    //encontrar todos os recados
    @Get()
    findAll() {
        return 'This action returns all schedules';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('esse é o id: ', id);
        return `This action returns ONE schedule`;
    }


    //aqui o @Body vai recuperar valores enviados na requisição, e dentro dos ('') da pra recuperar uma key especifica
    @Post()
    create(@Body() body: any) {
        return 'This action adds a new schedule';
    }

    //Patch -> para atualizar dados de um recurso, Put -> para atualizar um recurso inteiro(json completo)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return {
            id,
            ...body //... spread operator, ele vai pegar todos os dados do body e colocar dentro do objeto que estamos retornando
        };
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes the schedule with ID: ${id}`;
    }
}
