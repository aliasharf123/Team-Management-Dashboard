import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets'
import { ProjectService } from './project.service'
import { UseFilters } from '@nestjs/common'
import { Namespace } from 'socket.io'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { SocketWithAuth } from 'src/auth/types'
import { GatewayConnections } from 'src/gatewayConnections.gateway'

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ namespace: 'project' })
export class ProjectGateway extends GatewayConnections {
  @WebSocketServer()
  io: Namespace

  constructor(private readonly projectService: ProjectService) {
    super()
  }

  @SubscribeMessage('share_with')
  async shareWith(
    @MessageBody('id') id: string,
    @ConnectedSocket() client: SocketWithAuth
  ) {
    client.broadcast.emit('message', { id })
  }
}
