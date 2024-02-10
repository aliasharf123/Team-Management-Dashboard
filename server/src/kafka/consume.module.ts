import { Module } from '@nestjs/common'
import { ConsumerService } from './consume.service'

@Module({
  providers: [ConsumerService],
})
export class ConsumerModule {}
