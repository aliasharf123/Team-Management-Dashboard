import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'

export type NotificationDocument = HydratedDocument<Notification>

@Schema()
export class Notification extends Document {
  @Prop()
  title: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  from: Types.ObjectId

  @Prop()
  content: string

  @Prop({ type: Boolean, default: false })
  isRead: boolean

  @Prop()
  sendAt: Date
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
