import { Injectable } from '@nestjs/common';
import { CreateTypesWorkDto } from './dto/create-types_work.dto';
import { UpdateTypesWorkDto } from './dto/update-types_work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesWork } from './entities/types_work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypesWorkService {

  constructor(
    @InjectRepository(TypesWork)
    private readonly typesWorkRepository: Repository<TypesWork>,
  ) { }

  async create(createTypesWorkDto: CreateTypesWorkDto) {
    const typesWork = {
      name: createTypesWorkDto.name,
      type_event: createTypesWorkDto.type_event,
    };
    const newTypesWork = this.typesWorkRepository.create(typesWork);
    await this.typesWorkRepository.save(newTypesWork);
    return newTypesWork;

  }

  findAll() {
    return `This action returns all typesWork`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typesWork`;
  }

  update(id: number, updateTypesWorkDto: UpdateTypesWorkDto) {
    return `This action updates a #${id} typesWork`;
  }

  remove(id: number) {
    return `This action removes a #${id} typesWork`;
  }
}
