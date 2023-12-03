import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Project } from './schemas/project.schema'
import { ClientSession, Model } from 'mongoose'
import { CreateProjectDto } from './dto/create-project.dto'
import { Role } from 'src/user/types'

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    session?: ClientSession
  ) {
    try {
      // add date to data
      const projectWithDate = {
        ...createProjectDto,
        createdAt: new Date(),
        updateAt: new Date(),
      }

      const createProject = new this.projectModel(projectWithDate)
      Logger.log(`a created project id ${createProject._id.toString()}`)

      return createProject.save({ session })
    } catch (err) {
      throw new ForbiddenException(err)
    }
  }

  async getProjectById(id: string) {
    try {
      const project = await this.projectModel.findById(id).exec()
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
      const project = await this.projectModel.findOneAndUpdate(
        { _id: projectId, 'team.user': { $ne: userId } },
        { $push: { team: { user: userId, role } } },
        { new: true, session: session }
      )

      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`)
      }

      return project
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
}
