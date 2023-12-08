import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets'
import { NotificationService } from './notification.service'
import { SocketWithAuth } from 'src/auth/types'
import { Namespace } from 'socket.io'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UseFilters, UseGuards } from '@nestjs/common'
import { AdminUserGuard } from 'src/auth/guard/admin-user.guard'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { User } from 'src/user/schemas/user.schema'
import { Project } from 'src/project/schemas/project.schema'
import { ClientSession } from 'mongoose'
import { UserService } from 'src/user/user.service'
import { ProjectService } from 'src/project/project.service'
import { SessionService } from 'src/session.service'
import { CommunicationService } from './communication.server'
import { Role } from 'src/user/types'

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
    private projectService: ProjectService,
    private sessionService: SessionService,
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
    @MessageBody('sendToGmail') sendToGmail: string,
    @MessageBody('projectId') projectId: string,
    @MessageBody('role') role: string,
    @ConnectedSocket() client: SocketWithAuth
  ) {
    const results = await Promise.all([
      this.projectService.findOne(projectId),
      this.userService.searchForUser(sendToGmail),
    ])
    const project: Project = results[0]

    const sendToUser: User = results[1]

    const createInvitation = await this.sessionService.startSession(
      async (session: ClientSession) => {
        const createInvitation =
          await this.notificationService.createInvitation(
            sendToUser,
            project,
            client,
            role,
            session
          )
        await this.userService.addNotification(
          createInvitation,
          sendToUser._id,
          session
        )

        return createInvitation
      }
    )
    this.io
      .to(this.userIdToSocketIdMap[sendToUser._id.toString()])
      .emit('receiveNotification', createInvitation)
  }
}
