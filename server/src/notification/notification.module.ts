import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationGateway } from './notification.gateway'
import { MongooseModule } from '@nestjs/mongoose'
import { Notification, NotificationSchema } from './schemas/notification.schema'
import { NotificationRepository } from './notification.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationGateway, NotificationService, NotificationRepository],
  exports: [MongooseModule],
})
export class NotificationModule {}
