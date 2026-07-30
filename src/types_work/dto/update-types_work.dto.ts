import { PartialType } from '@nestjs/mapped-types';
import { CreateTypesWorkDto } from './create-types_work.dto';

export class UpdateTypesWorkDto extends PartialType(CreateTypesWorkDto) {}
