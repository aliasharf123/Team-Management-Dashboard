import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { Role } from 'src/user/types'

export type NotificationDocument = HydratedDocument<Notification>

@Schema()
export class Notification extends Document {
  @Prop()
  title: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  from: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'User' })
  to: Types.ObjectId

  @Prop()
  content: string

  @Prop({ type: Boolean, default: false })
  isRead: boolean

  @Prop({
    type: { project: { type: Types.ObjectId, ref: 'Project' }, role: String },
  })
  projectInvitation: { project: Types.ObjectId; role: string }

  @Prop()
  sendAt: Date
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
