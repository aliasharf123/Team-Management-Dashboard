import { Injectable } from '@nestjs/common';
import { CreateNotifictionDto } from './dto/create-notifiction.dto';
import { UpdateNotifictionDto } from './dto/update-notifiction.dto';

@Injectable()
export class NotifictionService {
  create(createNotifictionDto: CreateNotifictionDto) {
    return 'This action adds a new notifiction';
  }

  findAll() {
    return `This action returns all notifiction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notifiction`;
  }

  update(id: number, updateNotifictionDto: UpdateNotifictionDto) {
    return `This action updates a #${id} notifiction`;
  }

  remove(id: number) {
    return `This action removes a #${id} notifiction`;
  }
}
