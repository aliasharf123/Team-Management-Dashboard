import { Injectable } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { ClientSession } from 'mongoose'
import { UserRepository } from './user.repository'
import { Notification } from 'src/notification/schemas/notification.schema'
import { SocketWithAuth } from 'src/auth/types'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async addProject(
    projectId: string,
    role: string,
    userID: string,
    session?: ClientSession
  ): Promise<User> {
    return this.userRepository.addProject(projectId, role, userID, session)
  }

  async getUserById(userId: string) {
    return this.userRepository.getUserById(userId)
  }
  async addNotification(
    notification: Notification,
    userId: string,
    session?: ClientSession
  ) {
    return this.userRepository.addNotification(notification, userId, session)
  }
  async searchForUser(userEmail: string) {
    return this.userRepository.searchForUser(userEmail)
  }
  getNotifications(userId: string) {
    return this.userRepository.getNotifications(userId)
  }
}
