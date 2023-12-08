import { ClientSession, Model, Types } from 'mongoose'
import { Notification } from './schemas/notification.schema'
import { InjectModel } from '@nestjs/mongoose'
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { Project } from 'src/project/schemas/project.schema'
@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>
  ) {}

  async createNotification(
    senderId: string,
    title: string,
    content: string,
    projectInvitation?: Project,
    session?: ClientSession
  ) {
    try {
      const notification = {
        title,
        content,
        from: new Types.ObjectId(senderId),
        projectInvitation: projectInvitation._id,
        sendAt: new Date(),
      }

      const createNotification = new this.notificationModel(notification)

      return createNotification.save({ session: session })
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async markAsRead(notificationId: string) {
    try {
      const notification = await this.notificationModel.findOneAndUpdate(
        { _id: notificationId },
        { $set: { isRead: true } },
        { new: true }
      )
      if (!notification) throw new NotFoundException('notification not found')
      return notification
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
}
