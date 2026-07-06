export class CreateSchedulesDto {
    readonly title?: string;
    readonly description?: string;
    readonly date_initial?: Date;
    readonly date_end?: Date;
}


//o ? indica que as chaves são opcionais, podem ser criadas com
// algum dos campos faltando