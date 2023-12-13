import { Injectable } from '@nestjs/common'
import { ClientSession } from 'mongoose'
import { Project } from 'src/project/schemas/project.schema'
import { NotificationRepository } from './notification.repository'
import { User } from 'src/user/schemas/user.schema'
import { AdminSocket, SocketWithAuth } from 'src/auth/types'
import { Notification } from './schemas/notification.schema'

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async createInvitation(
    invitedUser: User,
    project: Project,
    clientSocket: SocketWithAuth,
    role: string,
    session?: ClientSession
  ) {
    const { title, content } = this.createContent('Invitation')

    return this.notificationRepository.createNotification(
      clientSocket.userId,
      invitedUser._id,
      title(project.title),
      content(project, clientSocket.username, invitedUser.email),
      project,
      role,
      session
    )
  }
  async createRemoveUserNotification(
    invitedUserId: string,
    project: Project,
    clientSocket: SocketWithAuth,
    session?: ClientSession
  ) {
    const { title, content } = this.createContent('removeUser')

    return this.notificationRepository.createNotification(
      clientSocket.userId,
      invitedUserId,
      title(project, clientSocket),
      content(project),
      undefined,
      undefined,
      session
    )
  }
  async createAcceptNotification(
    senderId: string,
    invitedUserId: string,
    project: Project,
    session?: ClientSession
  ) {
    const { title, content } = this.createContent('acceptInvitation')
    return this.notificationRepository.createNotification(
      senderId,
      invitedUserId,
      title(project),
      content(project),
      undefined,
      undefined,
      session
    )
  }
  markIsRead(id: string) {
    return this.notificationRepository.markAsRead(id)
  }

  createContent(type: 'Invitation' | 'acceptInvitation' | 'removeUser') {
    let content: any
    let title: any

    if (type == 'Invitation') {
      title = (projectName: string) =>
        `🚀 Your VIP Invite to ${projectName} ! 🎉`

      content = (project: Project, adminName: string) => `
  
      You've been invited to join the ${project.title} project! 🚀
      
      Cheers,
      ${adminName}
  
      #ProjectInvitation 🎉
    `
    } else if (type === 'acceptInvitation') {
      title = (project: Project) =>
        `🎉 New Member Joined ${project.title} Project! 🚀`
      content = (project: Project) => `    
        Good news! A new member has accepted the invitation to join the ${project.title} project. 🎉
    
        Cheers,
        Project Notification
    
        #ProjectSuccess 🚀
      `
    } else if (type == 'removeUser') {
      title = (project: Project, client: AdminSocket) =>
        `⚠️ ${client.username} Removed You from ${project.title} Project`
      content = (project: Project) => `
  
      you have been kicked from ${project.title}

      Regards,
      Project Notification
  
      #ProjectUpdate ⚠️
    `
    }

    return { title, content }
  }
  getNotificationById(id: string) {
    return this.notificationRepository.getById(id)
  }
  delete(id: string): Promise<Notification> {
    return this.notificationRepository.delete(id)
  }
}
