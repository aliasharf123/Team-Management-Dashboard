import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets'
import { NotificationService } from './notification.service'
import { AdminSocket } from 'src/auth/types'
import { Namespace } from 'socket.io'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UseFilters, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminUserGuard } from 'src/auth/guard/admin-user.guard'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { User } from 'src/user/schemas/user.schema'
import { Project } from 'src/project/schemas/project.schema'
import { UserService } from 'src/user/user.service'
import { CommunicationService } from './communication.server'
import { InvitationDto } from './dto/invitation.dto'

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ namespace: 'notification' })
export class NotificationGateway
  extends GatewayConnections
  implements OnGatewayInit
{
  @WebSocketServer()
  io: Namespace

  constructor(
    private readonly notificationService: NotificationService,
    private userService: UserService,
    private communicationService: CommunicationService
  ) {
    super()
  }
  afterInit(server: any) {
    this.communicationService.setNotificationNamespace(server)
    this.communicationService.setUserIdMap(this.userIdToSocketIdMap)
  }

  @UseGuards(AdminUserGuard)
  @SubscribeMessage('sendInvitation')
  async sendInvitation(
    @MessageBody(new ValidationPipe()) invitationDto: InvitationDto,

    @ConnectedSocket() client: AdminSocket
  ) {
    const { sendToGmail, role } = invitationDto

    const start = new Date().getTime()

    const project: Project = client.project
    const sendToUser: User = await this.userService.searchForUser(sendToGmail)
    console.log(new Date().getTime() - start, 'find')

    const start1 = new Date().getTime()

    const createInvitation = await this.notificationService.createInvitation(
      sendToUser,
      project,
      client,
      role
    )
    console.log(new Date().getTime() - start1, 'createInvitation')

    this.io
      .to(this.userIdToSocketIdMap[sendToUser._id.toString()])
      .emit('receiveNotification', createInvitation)
    console.log(new Date().getTime() - start, 'total')
  }
}
