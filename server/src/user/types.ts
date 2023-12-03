import { ObjectId } from 'mongoose'
import { User } from './schemas/user.schema'

export type UserDoc = User & { _id: ObjectId }

export enum Role {
  ADMIN,
  FULL_ACCESS,
  READ_ONLY,
}
