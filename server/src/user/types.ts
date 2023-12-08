import { ObjectId } from 'mongoose'
import { User } from './schemas/user.schema'

export type UserDoc = User & { _id: ObjectId }

export enum Role {
  ADMIN = 'admin',
  FULL_ACCESS = 'full_access',
  READ_ONLY = 'read_only',
}
