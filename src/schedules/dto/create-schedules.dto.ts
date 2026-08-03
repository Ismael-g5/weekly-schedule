import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSchedulesDto {

    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    date_initial?: string;

    @IsNotEmpty()
    date_end?: string;

}
