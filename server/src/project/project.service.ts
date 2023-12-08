import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { ClientSession } from 'mongoose'
import { UserService } from 'src/user/user.service'
import { Role } from 'src/user/types'
import { ProjectRepository } from './project.repository'
import { SessionService } from 'src/session.service'
import { UpdateProjectDto } from './dto/update-project.dto'

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
      await this.userService.addProject(
        createProject,
        Role.ADMIN.toString(),
        adminId,
        session
      )
      return createProject
    })
  }

  findOne(id: string) {
    return this.projectRepository.getProjectById(id)
  }
  addUserToProject(userId: string, projectId: string, role: Role) {
    return this.projectRepository.addUserToProject(userId, projectId, role)
  }
  update(projectId: string, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(projectId, updateProjectDto)
  }
}
