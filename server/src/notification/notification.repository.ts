import mongoose, { ClientSession, Model, Types } from 'mongoose'
import { Notification } from './schemas/notification.schema'
import { InjectModel } from '@nestjs/mongoose'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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
    session?: ClientSession
  ) {
    try {
      const notification = {
        title,
        content,
        from: new Types.ObjectId(senderId),
        sendAt: new Date(),
      }

      const createNotification = new this.notificationModel(notification)

      return createNotification.save({ session: session })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
