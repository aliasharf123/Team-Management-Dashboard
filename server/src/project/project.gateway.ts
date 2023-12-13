import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets'
import { ProjectService } from './project.service'
import {
  NotFoundException,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { Server } from 'socket.io'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { AdminSocket, SocketWithAuth } from 'src/auth/types'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UpdateProjectDto } from './dto/update-project.dto'
import { AdminUserGuard } from 'src/auth/guard/admin-user.guard'
import { AcceptInvitationDto } from './dto/accept-projectInvitation.dto'
import { CommunicationService } from 'src/notification/communication.server'
import { NotificationService } from 'src/notification/notification.service'
import { WsBadRequestException } from 'src/expections/ws-filters'
import { SessionService } from 'src/session.service'
import { UserService } from 'src/user/user.service'
import { RemoveUserDto } from './dto/remove-user.dto'
import { DeleteProjectDto } from './dto/delete-project.dto'

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
  @UseGuards(AdminUserGuard)
  @SubscribeMessage('updateProject')
  async update(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody(new ValidationPipe()) updateProjectDto: UpdateProjectDto
  ) {
    const startTime = new Date().getTime()

    const updatedProject = await this.projectService.update(
      updateProjectDto.id,
      updateProjectDto
    )

    this.io
      .to(updateProjectDto.id)
      .emit('projectUpdated', { updatedProject, updatedBy: client.userId })

    console.log(new Date().getTime() - startTime)
  }
  @SubscribeMessage('acceptInvitation')
  async acceptInvitation(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody(new ValidationPipe()) acceptInvitationDto: AcceptInvitationDto
  ) {
    const startTime = new Date().getTime()

    const invitation = await this.notificationService.getNotificationById(
      acceptInvitationDto.invitationId
    )
    console.log(new Date().getTime() - startTime, 'getNotificationById')
    if (!invitation.projectInvitation) {
      throw new WsBadRequestException('It is notification is not invitation')
    }
    if (invitation.to.toString() !== client.userId) {
      throw new WsBadRequestException("you aren't the one this invitation to")
    }
    const projectId = invitation.projectInvitation.project.toString()
    const [updatedProject, acceptInvitation] =
      await this.sessionService.startSession(async (session) => {
        const startTime = new Date().getTime()

        const updatedProject = await this.projectService.addUserToProject(
          client.userId,
          projectId,
          invitation.projectInvitation.role,
          session
        )
        console.log(new Date().getTime() - startTime, 'updatedProject')

        const startTime1 = new Date().getTime()

        const acceptInvitation =
          await this.notificationService.createAcceptNotification(
            invitation.from as any,
            client.userId,
            updatedProject,
            session
          )
        console.log(
          new Date().getTime() - startTime1,
          'createAcceptNotification'
        )

        return [updatedProject, acceptInvitation]
      })
    this.communicationService.sendEventToNotificationNamespace(
      invitation.from as any,
      acceptInvitation
    )
    this.io
      .to(projectId)
      .emit('projectUpdated', { updatedProject, updatedBy: client.userId })
    this.io.in(client.id).socketsJoin(projectId)

    console.log(new Date().getTime() - startTime, 'total')
  }
  // overwrite the hook method
  async joinUsersToRooms(client: SocketWithAuth): Promise<void> {
    const projects = await this.userService.getProjects(client.userId)
    client.joinedProjects = projects
    if (projects) {
      projects.forEach((project) => {
        this.io.in(client.id).socketsJoin(project._id.toString())
      })
    }
  }
  @UseGuards(AdminUserGuard)
  @SubscribeMessage('removeUser')
  async removeUser(
    @ConnectedSocket() client: AdminSocket,
    @MessageBody(new ValidationPipe()) removeUserDto: RemoveUserDto
  ) {
    const projectId = client.project._id.toString()

    const userRole = client.project.team.find(
      (value) => value.user.toString() == removeUserDto.userId
    )
    if (!userRole) {
      throw new NotFoundException('user not found in project')
    }
    const startTime = new Date().getTime()
    const [updatedProject, notification] =
      await this.sessionService.startSession(async (session) => {
        const startTime = new Date().getTime()
        const updatedProject = await this.projectService.removeUser(
          removeUserDto.userId,
          projectId,
          session
        )
        console.log(new Date().getTime() - startTime, 'removeUser')
        const startTime1 = new Date().getTime()

        const notification =
          await this.notificationService.createRemoveUserNotification(
            removeUserDto.userId,
            client.project,
            client as any,
            session
          )
        console.log(
          new Date().getTime() - startTime1,
          'createRemoveUserNotification'
        )

        return [updatedProject, notification]
      })
    this.communicationService.sendEventToNotificationNamespace(
      removeUserDto.userId,
      notification
    )
    const startTime12 = new Date().getTime()
    this.io
      .to(projectId)
      .emit('projectUpdated', { updatedProject, updatedBy: client.userId })

    this.io
      .in(this.userIdToSocketIdMap[removeUserDto.userId])
      .socketsLeave(projectId)
    console.log(new Date().getTime() - startTime12)

    console.log(new Date().getTime() - startTime, 'full')
  }

  @UseGuards(AdminUserGuard)
  @SubscribeMessage('deleteProject')
  async deleteProject(
    @ConnectedSocket() client: AdminSocket,
    @MessageBody(new ValidationPipe()) deleteProjectDto: DeleteProjectDto
  ) {
    const startTime = new Date().getTime()
    await this.projectService.deleteProject(deleteProjectDto.id)

    this.io
      .to(deleteProjectDto.id)
      .emit('projectDeleted', {
        deletedProject: client.project,
        deletedBy: client.userId,
      })
    console.log(new Date().getTime() - startTime, 'full')
  }
}
