// src/schedules/schedules.controller.ts
import { 
    Controller, 
    Get, 
    Param, 
    Post, 
    Body, 
    Patch, 
    Delete, 
    Put,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { UpdateSchedulesDto } from './dto/update-schedules.dto';
import { SchedulesEntity } from './entities/schedules.entity';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Get()
    findAll(): Promise<SchedulesEntity[]> {
        return this.schedulesService.findAll();
    }

    @Get('upcoming')
    findUpcoming(): Promise<SchedulesEntity[]> {
        return this.schedulesService.findUpcoming();
    }

    @Get('count')
    getCount(): Promise<number> {
        return this.schedulesService.count();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<SchedulesEntity> {
        return this.schedulesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createScheduleDto: CreateSchedulesDto): Promise<SchedulesEntity> {
        return this.schedulesService.create(createScheduleDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateScheduleDto: UpdateSchedulesDto
    ): Promise<SchedulesEntity> {
        return this.schedulesService.update(id, updateScheduleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.schedulesService.remove(id);
    }
}