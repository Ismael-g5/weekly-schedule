//import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { CreateSchedulesDto } from "./create-schedules.dto";

export class UpdateSchedulesDto extends PartialType(CreateSchedulesDto) {}
//classe extendida de createschedulesdto