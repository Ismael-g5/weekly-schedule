import { IsNotEmpty } from "class-validator";

export class CreateSchedulesDto {

    @IsNotEmpty()
    title?: string;

    description?: string;

    @IsNotEmpty()
    date_initial?: string;

    @IsNotEmpty()
    date_end?: string;

    @IsNotEmpty()
    type_work_id?: number;

}
