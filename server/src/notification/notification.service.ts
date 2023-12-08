import { Injectable } from '@nestjs/common'
import { ClientSession } from 'mongoose'
import { Project } from 'src/project/schemas/project.schema'
import { NotificationRepository } from './notification.repository'
import { User } from 'src/user/schemas/user.schema'
import { SocketWithAuth } from 'src/auth/types'
import { UserService } from 'src/user/user.service'
import { ProjectService } from 'src/project/project.service'
import { SessionService } from 'src/session.service'
import { Notification } from './schemas/notification.schema'
import { Role } from 'src/user/types'

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
      title(project.title),
      content(project, clientSocket.username, invitedUser.email),
      project,
      role,
      session
    )
  }
  async createAcceptNotification(
    senderId: string,
    project: Project,
    session?: ClientSession
  ) {
    const { title, content } = this.createContent('acceptInvitation')
    return this.notificationRepository.createNotification(
      senderId,
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

  createContent(type: 'Invitation' | 'acceptInvitation') {
    let content: any
    let title: any

    if (type == 'Invitation') {
      title = (projectName: string) =>
        `🚀 Your VIP Invite to ${projectName} ! 🎉`

      content = (project: Project, adminName: string, userName: string) => `
      Hi ${userName},
  
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
    }

    return { title, content }
  }
  getNotificationById(id: string) {
    return this.notificationRepository.getById(id)
  }
}
