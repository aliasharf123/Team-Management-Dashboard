import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password')

      if (!user) throw new NotFoundException('User not found')

      return user
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
  async searchForUser(userEmail: string) {
    const user = await this.userModel.findOne({ email: userEmail })

    if (!user) throw new NotFoundException("user doesn't exist")

    return user
  }
}
