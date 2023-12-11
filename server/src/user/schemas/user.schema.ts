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
}
export const UserSchema = SchemaFactory.createForClass(User)
