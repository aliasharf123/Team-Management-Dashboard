import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument, Types } from 'mongoose'
import { Project } from 'src/project/schemas/project.schema'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User extends Document {
  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({ required: false })
  imageUrl: string | undefined

  @Prop({
    type: [
      {
        project: { type: mongoose.Types.ObjectId, ref: 'Project' },
        role: String,
      },
    ],
  })
  projects: Array<{ project: Types.ObjectId; role: string }>

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Notification' }] })
  notifications: Notification[]
}
export const UserSchema = SchemaFactory.createForClass(User)
