// src/schedules/dto/create-schedules.dto.ts
import { IsDate, IsNotEmpty, IsString, IsOptional, IsDateString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateSchedulesDto {
    @IsString()
    @IsNotEmpty({ message: 'Título é obrigatório' })
    readonly title?: string;
    
    @IsString()
    @IsOptional()
    readonly description?: string;
    
    @IsDateString({}, { message: 'Data inicial deve ser uma data válida' })
    @IsNotEmpty({ message: 'Data inicial é obrigatória' })
    readonly date_initial?: string; // Usando string para data ISO
    
    @IsDateString({}, { message: 'Data final deve ser uma data válida' })
    @IsNotEmpty({ message: 'Data final é obrigatória' })
    readonly date_end?: string; // Usando string para data ISO
}