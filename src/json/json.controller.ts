import { Controller, Get, Param } from '@nestjs/common';
import { JsonService } from './json.service';

@Controller('json')
export class JsonController {
    constructor(private jsonService: JsonService) {}

    @Get('/:id')
    async getDataFromJson(@Param('id') id: string): Promise<string> {
        return await this.jsonService.getDataFromJson(id);
    }
}
