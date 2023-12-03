import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets'
import { ProjectService } from './project.service'
import { JwtAuthGuard } from 'src/auth/guard/auth.guard'
import { Logger, UseFilters, UseGuards } from '@nestjs/common'
import { Namespace } from 'socket.io'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { SocketWithAuth } from 'src/auth/types'
import { GatewayJwtGuard } from 'src/user/guard/gatway-admin.guard'

@UseFilters(new WsCatchAllFilter())
@UseGuards(GatewayJwtGuard)
@WebSocketGateway({ namespace: 'project' })
export class ProjectGateway {
  @WebSocketServer()
  io: Namespace

  constructor(private readonly projectService: ProjectService) {}

  @SubscribeMessage('share_with')
  async shareWith(
    @MessageBody('id') id: string,
    @ConnectedSocket() client: SocketWithAuth
  ) {
    client.broadcast.emit('message', { id })
  }
}
