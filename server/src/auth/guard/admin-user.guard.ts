import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common'
import { SocketWithAuth } from '../types'
import {
  WsBadRequestException,
  WsUnauthorizedException,
} from 'src/expections/ws-filters'
import { ProjectService } from 'src/project/project.service'
import { UpdateProjectDto } from 'src/project/dto/update-project.dto'

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
    if (client.userId !== project.admin._id.toString()) {
      throw new WsUnauthorizedException('need authorized to invite users')
    }

    return true
  }
}
