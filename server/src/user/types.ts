import { ObjectId } from 'mongoose';
import { User } from './schemas/user.schema';

export type UserDoc = User & { _id: ObjectId };
export type Role = 'ADMAIN' | 'FULL_ACCESS' | 'READ_ONLY';
