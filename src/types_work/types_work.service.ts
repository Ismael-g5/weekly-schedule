import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  } catch(error) {
    //erro de repetição
    if (error.code === '23505') {
      throw new ConflictException(`Erro ao criar o tipo de trabalho: Nome ou tipo de evento já existe.`);
    }
  }
  async findAll() {
    const typesWork = await this.typesWorkRepository.find({
      order: {
        id: 'desc',
      },
    });
    return typesWork;
  }

  async findOne(id: number) {
    const typesWork = await this.typesWorkRepository.findOne({ where: { id } });
    if (!typesWork) {
      throw new NotFoundException(`Erro ao encontrar o tipo de trabalho: Tipo de trabalho não encontrado.`);
    }
    return typesWork;
  }

 async update(id: number, updateTypesWorkDto: UpdateTypesWorkDto) {
  const dataTypesWork = {
    name: updateTypesWorkDto?.name,
    type_event: updateTypesWorkDto?.type_event,
  };
  
  const typesWork = await this.typesWorkRepository.preload({ 
      id,
      ...dataTypesWork,

     });
     if (!typesWork) {
      throw new NotFoundException(`Erro ao atualizar o tipo de trabalho: Tipo de trabalho não encontrado.`);
    }
    return this.typesWorkRepository.save(typesWork);

  }

  async remove(id: number) {
   const typesWork = await this.typesWorkRepository.findOne({ where: { id } });
    if (!typesWork) {
      throw new NotFoundException(`Erro ao deletar o tipo de trabalho: Tipo de trabalho não encontrado.`);
    }
    return this.typesWorkRepository.remove(typesWork);
  }
}
