import { IsNotEmpty } from "class-validator";
export class CreateTypesWorkDto {

    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    type_event?: string;


}
