import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ClientSession, Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Notification } from 'src/notification/schemas/notification.schema'
import { Project } from 'src/project/schemas/project.schema'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string) {
    try {
      const user = await this.userModel
        .findById(id)
        .select('-password')
        .populate('projects')

      if (!user) throw new NotFoundException('User not found')

      user.projects = (await this.userModel.populate(user.projects, {
        path: 'project',
      })) as any

      return user
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
  async addProject(
    project: Project,
    role: string,
    userID: string,
    session?: ClientSession
  ): Promise<User> {
    const user = await this.userModel.findById(userID)

    if (!user) throw new NotFoundException("user doesn't exist")

    user.projects.push({ project: project._id, role: role })

    return user.save({ session: session })
  }

  async addNotification(
    notification: Notification,
    userId: string,
    session?: ClientSession
  ) {
    const user = await this.userModel.findById(userId)

    if (!user) throw new NotFoundException("user doesn't exist")

    user.notifications.push(notification._id)

    return user.save({ session: session })
  }
  async searchForUser(userEmail: string) {
    const user = await this.userModel.findOne({ email: userEmail })

    if (!user) throw new NotFoundException("user doesn't exist")

    return user
  }
}
