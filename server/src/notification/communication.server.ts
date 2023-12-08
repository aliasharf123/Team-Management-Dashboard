// communication.service.ts
import { Injectable } from '@nestjs/common'
import { Server } from 'socket.io'

@Injectable()
export class CommunicationService {
  private notificationNamespace: Server
  private userIdMap: Record<string, string>

  setNotificationNamespace(namespace: Server) {
    this.notificationNamespace = namespace
  }
  setUserIdMap(userIdMap: Record<string, string>) {
    this.userIdMap = userIdMap
  }

  sendEventToNotificationNamespace(userId: string, notification: any) {
    this.notificationNamespace
      .to(this.userIdMap[userId])
      .emit('receiveNotification', notification)
  }
}
