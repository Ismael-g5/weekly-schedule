import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}


//DTO -> data transfer object: é um padrão de projeto, para transporte de dados
// é um tipo, um objeto que define a estrutura dos dados que serão enviados ou recebidos em uma requisição HTTP. Ele ajuda a garantir que os dados estejam no formato correto e facilita a validação e transformação dos dados antes de serem processados pelo serviço ou controlador.(padrão original)
// no nest valida ou transforma dados