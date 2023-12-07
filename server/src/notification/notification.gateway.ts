import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets'
import { NotificationService } from './notification.service'
import { SocketWithAuth } from 'src/auth/types'
import { Namespace } from 'socket.io'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UserService } from 'src/user/user.service'
import {
  WsUnauthorizedException,
  WsUnknownException,
} from 'src/expections/ws-filters'
import { ProjectService } from 'src/project/project.service'
import { SessionService } from 'src/session.service'
import { ClientSession } from 'mongoose'

@WebSocketGateway({ namespace: 'notification' })
export class NotificationGateway extends GatewayConnections {
  @WebSocketServer()
  io: Namespace

  constructor(
    private readonly notificationService: NotificationService,
    private userService: UserService,
    private projectService: ProjectService,
    private sessionService: SessionService
  ) {
    super()
  }

  @SubscribeMessage('sendInvitation')
  async sendInvitation(
    @MessageBody('sendToGmail') sendToGmail: string,
    @MessageBody('projectId') projectId: string,
    @ConnectedSocket() client: SocketWithAuth
  ) {
    try {
      const project = await this.projectService.findOne(projectId)

      const sendToUser = await this.userService.searchForUser(sendToGmail)

      const projectAdmin = project.admin
      if (client.userId !== projectAdmin.toString()) {
        throw new WsUnauthorizedException('need authorized to invite users')
      }

      const createInvitation = await this.sessionService.startSession(
        async (session: ClientSession) => {
          const createInvitation =
            await this.notificationService.createInvitation(
              sendToUser,
              project,
              client,
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
    } catch (err) {
      throw new WsUnknownException(err.message)
    }
  }
}
