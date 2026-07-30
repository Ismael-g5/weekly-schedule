import { Module } from '@nestjs/common';
import { TypesWorkService } from './types_work.service';
import { TypesWorkController } from './types_work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesWork } from './entities/types_work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypesWork])],
  controllers: [TypesWorkController],
  providers: [TypesWorkService],
})
export class TypesWorkModule {}
