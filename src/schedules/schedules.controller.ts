import { Controller, Get, Param, Post, Body, Patch, Delete, Put } from '@nestjs/common';
import { SchedulesService } from './schedules.service';


@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}
    //encontrar todos os recados
    @Get()
    findAll() {
        return this.schedulesService.findAll(); // retorna o metodo criado no service
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('esse é o id: ', id);
        return `This action returns ONE schedule`;
    }


    //aqui o @Body vai recuperar valores enviados na requisição, e dentro dos ('') da pra recuperar uma key especifica
    @Post()
    create(@Body() body: any) {
        return this.schedulesService.create(body); // retorna o metodo criado no service
    }

    //Patch -> para atualizar dados de um recurso, Put -> para atualizar um recurso inteiro(json completo)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.schedulesService.update(id, body); // retorna o metodo criado no service
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.schedulesService.remove(id); // retorna o metodo criado no service
    }
}
