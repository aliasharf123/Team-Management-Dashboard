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

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    session?: ClientSession
  ) {
    // add date to data
    const projectWithDate = {
      ...createProjectDto,
      createdAt: new Date(),
      updateAt: new Date(),
    }

    const createProject = new this.projectModel(projectWithDate)
    Logger.log(`a created project id ${createProject._id.toString()}`)

    return createProject.save({ session })
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
}
