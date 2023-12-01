import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Project } from './schemas/project.schema'
import { ClientSession, Connection, Model } from 'mongoose'
import { UserService } from 'src/user/user.service'
import { Role } from 'src/user/types'
import { ProjectRepository } from './project.repository'
import { SessionService } from 'src/session.service'

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    adminId: string
  ): Promise<any> {
    return this.sessionService.startSession(async (session: ClientSession) => {
      const createProject = await this.projectRepository.createProject(
        createProjectDto,
        adminId,
        session
      )

      if (!createProject) throw new Error()

      // Add project to adminId user
      const userDoc = await this.userService.addProject(
        createProject,
        Role.ADMIN.toString(),
        adminId,
        session
      )

      if (!userDoc) throw new Error()

      return createProject
    })
  }

  findOne(id: string) {
    return this.projectRepository.getProjectById(id)
  }
}
