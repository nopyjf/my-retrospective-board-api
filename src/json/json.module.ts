import { Module } from '@nestjs/common';
import { JsonController } from './json.controller';
import { JsonService } from './json.service';

@Module({
  controllers: [JsonController],
  providers: [JsonService]
})
export class JsonModule {}
