import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets'
import { ProjectService } from './project.service'
import { UseFilters, UseGuards, ValidationPipe } from '@nestjs/common'
import { Server } from 'socket.io'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { SocketWithAuth } from 'src/auth/types'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UpdateProjectDto } from './dto/update-project.dto'
import { AdminUserGuard } from 'src/auth/guard/admin-user.guard'
import { AcceptInvitationDto } from './dto/accept-projectInvitation.dto'
import { CommunicationService } from 'src/notification/communication.server'
import { NotificationService } from 'src/notification/notification.service'
import { WsBadRequestException } from 'src/expections/ws-filters'
import { SessionService } from 'src/session.service'
import { Project } from './schemas/project.schema'
import { User } from 'src/user/schemas/user.schema'
import { UserService } from 'src/user/user.service'

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ namespace: 'project' })
export class ProjectGateway extends GatewayConnections {
  @WebSocketServer()
  io: Server

  constructor(
    private readonly projectService: ProjectService,
    private communicationService: CommunicationService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UserService
  ) {
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
    const startTime = new Date().getTime()
    const invitation = await this.notificationService.getNotificationById(
      acceptInvitationDto.invitationId
    )
    if (!invitation.projectInvitation) {
      throw new WsBadRequestException('it is notification is not invitation')
    }
    const projectId = invitation.projectInvitation.project
    const [updatedProject, acceptInvitation] =
      await this.sessionService.startSession(async (session) => {
        const results = await Promise.all([
          this.projectService.addUserToProject(
            client.userId,
            projectId as any,
            invitation.projectInvitation.role,
            session
          ),
          this.userService.addProject(
            projectId as any,
            invitation.projectInvitation.role,
            client.userId,
            session
          ),
        ])
        const acceptInvitation =
          await this.notificationService.createAcceptNotification(
            invitation.from as any,
            results[0],
            session
          )
        await this.userService.addNotification(
          acceptInvitation,
          invitation.from as any,
          session
        )

        return [results[0], acceptInvitation]
      })
    this.communicationService.sendEventToNotificationNamespace(
      invitation.from as any,
      acceptInvitation
    )
    console.log(new Date().getTime() - startTime)
    return updatedProject
  }
}
