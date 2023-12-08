import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets'
import { ProjectService } from './project.service'
import { UseFilters, UseGuards, ValidationPipe } from '@nestjs/common'
import { Namespace } from 'socket.io'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { SocketWithAuth } from 'src/auth/types'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UpdateProjectDto } from './dto/update-project.dto'
import { AdminUserGuard } from 'src/auth/guard/admin-user.guard'
import { AcceptInvitationDto } from './dto/accept-projectInvitation.dto'

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ namespace: 'project' })
export class ProjectGateway extends GatewayConnections {
  @WebSocketServer()
  io: Namespace

  constructor(private readonly projectService: ProjectService) {
    super()
  }
  // @UseGuards(AdminUserGuard)
  // @SubscribeMessage('updateProject')
  // async update(
  //   @ConnectedSocket() client: SocketWithAuth,
  //   @MessageBody() updateProjectDto: UpdateProjectDto
  // ) {
  //   const
  // }
  @SubscribeMessage('acceptInvitation')
  async acceptInvitation(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody(new ValidationPipe()) acceptInvitationDto: AcceptInvitationDto
  ) {
    return
  }
}
