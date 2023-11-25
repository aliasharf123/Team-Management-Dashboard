import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document{
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  imageUrl: string | undefined

  @Prop(
    raw([
      {
        project: {
          type: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        },
        role: { type: String, enum: ['ADMAIN', 'FULL_ACCESS', 'READ_ONLY'] },
      },
    ]),
  )
  projects: Array<{ project: Project; role: string }>;
}
export const UserSchema = SchemaFactory.createForClass(User);
