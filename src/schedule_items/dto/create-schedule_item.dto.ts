import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleItemDto {

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    schedule_id?: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    type_work_id?: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(6)
    day_of_week?: number;

    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
        message: 'starts_at deve estar no formato HH:mm ou HH:mm:ss',
    })
    starts_at?: string;

    @IsOptional()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
        message: 'ends_at deve estar no formato HH:mm ou HH:mm:ss',
    })
    ends_at?: string;

}
