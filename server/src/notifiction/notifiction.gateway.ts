import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NotifictionService } from './notifiction.service';
import { CreateNotifictionDto } from './dto/create-notifiction.dto';
import { UpdateNotifictionDto } from './dto/update-notifiction.dto';

@WebSocketGateway()
export class NotifictionGateway {
  constructor(private readonly notifictionService: NotifictionService) {}

  @SubscribeMessage('createNotifiction')
  create(@MessageBody() createNotifictionDto: CreateNotifictionDto) {
    return this.notifictionService.create(createNotifictionDto);
  }

  @SubscribeMessage('findAllNotifiction')
  findAll() {
    return this.notifictionService.findAll();
  }

  @SubscribeMessage('findOneNotifiction')
  findOne(@MessageBody() id: number) {
    return this.notifictionService.findOne(id);
  }

  @SubscribeMessage('updateNotifiction')
  update(@MessageBody() updateNotifictionDto: UpdateNotifictionDto) {
    return this.notifictionService.update(updateNotifictionDto.id, updateNotifictionDto);
  }

  @SubscribeMessage('removeNotifiction')
  remove(@MessageBody() id: number) {
    return this.notifictionService.remove(id);
  }
}
