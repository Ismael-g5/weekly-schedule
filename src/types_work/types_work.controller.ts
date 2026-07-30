import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesWorkService } from './types_work.service';
import { CreateTypesWorkDto } from './dto/create-types_work.dto';
import { UpdateTypesWorkDto } from './dto/update-types_work.dto';

@Controller('types-work')
export class TypesWorkController {
  constructor(private readonly typesWorkService: TypesWorkService) {}

  @Post()
  create(@Body() createTypesWorkDto: CreateTypesWorkDto) {
    return this.typesWorkService.create(createTypesWorkDto);
  }

  @Get()
  findAll() {
    return this.typesWorkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesWorkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypesWorkDto: UpdateTypesWorkDto) {
    return this.typesWorkService.update(+id, updateTypesWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesWorkService.remove(+id);
  }
}
