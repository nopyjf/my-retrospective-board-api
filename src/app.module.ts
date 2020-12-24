import { Module } from '@nestjs/common';
import { JsonModule } from './json/json.module';

@Module({
  imports: [JsonModule],
})
export class AppModule {}
