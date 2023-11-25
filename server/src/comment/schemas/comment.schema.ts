import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { React } from '../types';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment extends Document{
  @Prop()
  title: string;

  @Prop({type : {type : Types.ObjectId , ref: 'User'}})
  commentBy: User

  @Prop({type : {type: Types.ObjectId, ref: 'Comment'} , required : false})
  reply: Comment[]

  @Prop()
  createdAt: Date;

  @Prop(raw([{
    emoji : String,
    reactBy: {type : Types.ObjectId , ref : 'User'}
  }]))
  react : React[]
  
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
