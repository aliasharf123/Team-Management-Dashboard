import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifictionDto } from './create-notifiction.dto';

export class UpdateNotifictionDto extends PartialType(CreateNotifictionDto) {
  id: number;
}
