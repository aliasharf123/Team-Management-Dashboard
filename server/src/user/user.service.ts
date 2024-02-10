import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { ProjectRepository } from 'src/project/project.repository'
import { NotificationRepository } from 'src/notification/notification.repository'
import { SubscribeTo } from 'src/kafka/decorator/kafka.decorator'
import { KafkaPayload } from 'src/kafka/kafka.message'

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository,
    private notificationRepository: NotificationRepository
  ) {}

  async getUserById(userId: string) {
    return this.userRepository.getUserById(userId)
  }
  async searchForUser(userEmail: string) {
    return this.userRepository.searchForUser(userEmail)
  }
  getNotifications(userId: string) {
    return this.notificationRepository.getUserNotification(userId)
  }
  getProjects(id: string) {
    return this.projectRepository.getUserProjects(id)
  }
}
