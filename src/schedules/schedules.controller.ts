import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('schedules')
export class SchedulesController {
    
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
}
