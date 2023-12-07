import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument, Types } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'

export type ProjectDocument = HydratedDocument<Project>

@Schema()
export class Project extends Document {
  @Prop()
  title: string

  @Prop({ required: false })
  overView: string

  @Prop()
  createdAt: Date

  @Prop()
  updateAt: Date

  @Prop({
    type: [{ user: { type: Types.ObjectId, ref: 'User' }, role: String }],
  })
  team: Array<{ user: User; role: string }>

  @Prop()
  isShared: boolean

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  admin: Types.ObjectId
}

export const ProjectSchema = SchemaFactory.createForClass(Project)
