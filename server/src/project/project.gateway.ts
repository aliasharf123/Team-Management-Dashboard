import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { ProjectService } from './project.service'
import { UpdateProjectDto } from './dto/update-project.dto'
import { JwtAuthGuard } from 'src/auth/guard/auth.guard'
import { UseGuards } from '@nestjs/common'
import { Namespace } from 'socket.io'

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ namespace: 'project' })
export class ProjectGateway {
  @WebSocketServer()
  io: Namespace

  constructor(private readonly projectService: ProjectService) {}
}
