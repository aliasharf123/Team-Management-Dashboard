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
        sendAt: new Date(),
      }

      let createNotification = new this.notificationModel(notification)

      await createNotification.save({ session: session })

      createNotification = await this.notificationModel.findOneAndUpdate(
        { _id: createNotification._id },
        { from: senderId },
        { new: true, session: session }
      )

      return createNotification
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
