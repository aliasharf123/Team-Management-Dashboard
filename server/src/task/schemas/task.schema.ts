import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument, ObjectId, Types } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { StatusEnum, Tag } from '../types'
import { Project } from 'src/project/schemas/project.schema'

export type TaskDocument = HydratedDocument<Task>

@Schema()
export class Task extends Document {
  @Prop()
  title: string

  @Prop({ required: false })
  dueDate: Date

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  assignTo: User[]

  @Prop({ type: String, enum: StatusEnum })
  status: StatusEnum

  @Prop(raw([{ name: String, color: String }]))
  tags: Tag[]

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project

  @Prop()
  createdAt: Date

  @Prop()
  updateAt: Date

  @Prop({ required: false })
  content: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
