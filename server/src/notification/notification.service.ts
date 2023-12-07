import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ClientSession, Model } from 'mongoose'
import { Project } from 'src/project/schemas/project.schema'
import { Notification } from './schemas/notification.schema'
import { NotificationRepository } from './notification.repository'
import { User } from 'src/user/schemas/user.schema'
import { SocketWithAuth } from 'src/auth/types'

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async createInvitation(
    invitedUser: User,
    project: Project,
    clientSocket: SocketWithAuth,
    session?: ClientSession
  ) {
    const { title, content } = this.createContent('Invitation')

    const CreateInvitation =
      await this.notificationRepository.createNotification(
        clientSocket.userId,
        title(project.title),
        content(project, clientSocket.username, invitedUser.email),
        session
      )
    return CreateInvitation
  }

  createContent(type: 'Invitation' | 'mention') {
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
    }

    return { title, content }
  }
}
