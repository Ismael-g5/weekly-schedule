import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateSchedulesDto {
    @IsString()
    @IsNotEmpty()
    readonly title?: string;
    
    @IsString()
    readonly description?: string;
    
    @IsDate()
    readonly date_initial?: Date;
    
    @IsDate()
    readonly date_end?: Date;
}


//o ? indica que as chaves são opcionais, podem ser criadas com
// algum dos campos faltando