import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulesService {
    hello(): string {
        return 'Hello World!';
    }
}