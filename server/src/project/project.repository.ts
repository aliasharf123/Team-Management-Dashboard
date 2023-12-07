import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Project } from './schemas/project.schema'
import { ClientSession, Model, Types } from 'mongoose'
import { CreateProjectDto } from './dto/create-project.dto'
import { Role } from 'src/user/types'

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    adminId: string,
    session?: ClientSession
  ) {
    try {
      // add date to data
      const projectWithDate = {
        title: createProjectDto.title,
        overView: createProjectDto.overView,
        createdAt: new Date(),
        updateAt: new Date(),
        admin: new Types.ObjectId(adminId),
      }
      const createProject = new this.projectModel(projectWithDate)
      Logger.log(`a created project id ${createProject._id.toString()}`)

      return createProject.save({ session })
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }

  async getProjectById(id: string) {
    try {
      const project = await this.projectModel
        .findById(id)
        .populate('admin')
        .exec()
      if (!project) throw new NotFoundException('Project not found')

      return project
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
  async getProjectTeam(id: string) {
    try {
      const project = await this.projectModel.findById(id).get('team')
      if (!project) throw new NotFoundException('Project not found')

      return project
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async addUserToProject(
    userId: string,
    projectId: string,
    role: Role,
    session?: ClientSession
  ) {
    try {
      // determine which is role of user
      // to make it admin or added to team
      let project = null
      if (role === Role.ADMIN) {
        project = await this.projectModel.findOneAndUpdate(
          { _id: projectId, 'team.user': { $ne: userId } },
          { admin: new Types.ObjectId(userId) },
          { new: true, session: session }
        )
      } else {
        project = await this.projectModel.findOneAndUpdate(
          { _id: projectId, 'team.user': { $ne: userId } },
          { $push: { team: { user: userId, role } } },
          { new: true, session: session }
        )
      }

      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`)
      }

      return project
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
}
