import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateSchedulesDto } from './dto/create-schedules.dto';
import { UpdateSchedulesDto } from './dto/update-schedules.dto';


//pipes
import { ParseIntIdPipe } from '../common/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header-interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
@Controller('schedules')
@UsePipes(ParseIntIdPipe) // Aplica o pipe a todos os métodos do controller
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createSchedulesDto: CreateSchedulesDto) {
    return this.schedulesService.create(createSchedulesDto);
  }

  @Get()
  //@UseInterceptors(AddHeaderInterceptor)
  @UseInterceptors(TimingConnectionInterceptor)
  findAll() {
    return this.schedulesService.findAll();
  }

  // Pipe de teste só neste caminho: GET /schedules/:id
  @Get(':id')
  findOne(@Param('id') id: number) { // 'param', NomePipe) id: number
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchedulesDto: UpdateSchedulesDto) {
    return this.schedulesService.update(+id, updateSchedulesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
