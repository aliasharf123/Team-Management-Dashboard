import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { ClientSession } from 'mongoose'
import { UserService } from 'src/user/user.service'
import { Role } from 'src/user/types'
import { ProjectRepository } from './project.repository'
import { SessionService } from 'src/session.service'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Project } from './schemas/project.schema'

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async create(
    createProjectDto: CreateProjectDto,
    adminId: string
  ): Promise<any> {
    return this.projectRepository.createProject(createProjectDto, adminId)
  }

  findOne(id: string) {
    return this.projectRepository.getProjectById(id)
  }
  addUserToProject(
    userId: string,
    projectId: string,
    role: string,
    session?: ClientSession
  ) {
    return this.projectRepository.addUserToProject(
      userId,
      projectId,
      role,
      session
    )
  }
  update(projectId: string, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(projectId, updateProjectDto)
  }
  removeUser(
    userId: string,
    projectId: string,
    session?: ClientSession
  ): Promise<Project> {
    return this.projectRepository.removeUser(userId, projectId, session)
  }
  deleteProject(projectId: string) {
    return this.projectRepository.deleteProject(projectId)
  }
}
