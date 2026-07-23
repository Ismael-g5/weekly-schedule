// src/schedules/dto/update-schedules.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { CreateSchedulesDto } from "./create-schedules.dto";

export class UpdateSchedulesDto extends PartialType(CreateSchedulesDto) {}