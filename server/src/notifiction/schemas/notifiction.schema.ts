import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type NotifictionDocument = HydratedDocument<Notifiction>;

@Schema()
export class Notifiction extends Document{
  @Prop()
  title: string;

  @Prop({type : {type : Types.ObjectId , ref: 'User'}})
  from: User

  @Prop({type : {type: Types.ObjectId , ref: 'User'}})
  to: User

  @Prop()
  content: string

  @Prop({type : Boolean , default: false})
  isRead: boolean

  @Prop()
  sendAt: Date;
  
}

export const NotifictionSchema = SchemaFactory.createForClass(Notifiction);
