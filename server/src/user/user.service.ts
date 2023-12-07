import { Injectable } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { ClientSession } from 'mongoose'
import { Project } from 'src/project/schemas/project.schema'
import { UserRepository } from './user.repository'
import { Notification } from 'src/notification/schemas/notification.schema'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async addProject(
    project: Project,
    role: string,
    userID: string,
    session?: ClientSession
  ): Promise<User> {
    return this.userRepository.addProject(project, role, userID, session)
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
}
