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
import { UpdateProjectDto } from './dto/update-project.dto'

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
        .findById(new Types.ObjectId(id))
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
    role: string,
    session?: ClientSession
  ): Promise<Project> {
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
  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectModel.findOneAndUpdate(
        { _id: projectId },
        { $set: updateProjectDto },
        { new: true }
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
