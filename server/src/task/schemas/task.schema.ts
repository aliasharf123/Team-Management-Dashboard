import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument, ObjectId } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { StatusEnum } from '../types'
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
  tags: Record<'name' | 'color', string>

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } })
  project: ObjectId

  @Prop()
  createdAt: Date

  @Prop()
  updateAt: Date

  @Prop({ required: false })
  content: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
