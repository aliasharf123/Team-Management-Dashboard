import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop({ required: false })
  overView: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop(
    raw([
      {
        user: { type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } },
        role: { type: String },
      },
    ]),
  )
  Team: Array<{ user: User; role: string }>;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  admin: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
