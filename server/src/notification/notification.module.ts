import { Global, Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationGateway } from './notification.gateway'
import { MongooseModule } from '@nestjs/mongoose'
import { Notification, NotificationSchema } from './schemas/notification.schema'
import { NotificationRepository } from './notification.repository'
import { NotificationController } from './notification.controller'
import { CommunicationService } from './communication.server'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [
    NotificationGateway,
    CommunicationService,
    NotificationService,
    NotificationRepository,
  ],
  exports: [NotificationService, CommunicationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
