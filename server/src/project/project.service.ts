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
        session
      )
      const projectWithAdmin = this.projectRepository.addUserToProject(
        adminId,
        createProject._id,
        Role.ADMIN,
        session
      )
      await this.userService.addProject(
        createProject,
        Role.ADMIN.toString(),
        adminId,
        session
      )
      return projectWithAdmin
    })
  }

  findOne(id: string) {
    return this.projectRepository.getProjectById(id)
  }
  getProjectTeam(id: string) {
    return this.projectRepository.getProjectById(id)
  }
}
