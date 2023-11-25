import { Module } from '@nestjs/common';
import { NotifictionService } from './notifiction.service';
import { NotifictionGateway } from './notifiction.gateway';

@Module({
  providers: [NotifictionGateway, NotifictionService],
})
export class NotifictionModule {}
