import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common'
import { SocketWithAuth } from '../types'
import {
  WsBadRequestException,
  WsUnauthorizedException,
} from 'src/expections/ws-filters'
import { ProjectService } from 'src/project/project.service'
import { UpdateProjectDto } from 'src/project/dto/update-project.dto'
import { Role } from 'src/user/types'

@Injectable()
export class AdminUserGuard implements CanActivate {
  constructor(private projectService: ProjectService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: SocketWithAuth = context.switchToWs().getClient()
    const messageBody: UpdateProjectDto = context.switchToWs().getData()
    const projectId = messageBody['id'] ?? messageBody['projectId']

    if (!projectId) {
      throw new WsBadRequestException('project id must provided')
    }
    const project = await this.projectService.findOne(projectId)

    if (!project) {
      throw new WsBadRequestException("Project doesn't found")
    }
    const userInTeam = project.team.find(
      (value) => value.user.toString() == client.userId
    )
    context.switchToHttp().getRequest().project = project
    if (!userInTeam) {
      throw new WsUnauthorizedException('user Id not in projectTeam')
    }
    if (userInTeam.role === Role.READ_ONLY) {
      throw new WsUnauthorizedException("user Id doesn't have authorization")
    }

    return true
  }
}
