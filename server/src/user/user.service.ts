import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { ClientSession, Model } from 'mongoose'
import { Project } from 'src/project/schemas/project.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  async getInfo(userId: string) {
    try {
      const user = await this.userModel
        .findById(userId)
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
}
