import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { SocketWithAuth } from './auth/types'

export class GatewayConnections
  implements OnGatewayConnection, OnGatewayDisconnect
{
  userIdToSocketIdMap: Record<string, string> = {}

  handleDisconnect(client: SocketWithAuth) {
    delete this.userIdToSocketIdMap[client.userId]

    client.broadcast.emit('user_disconnected', {
      description: 'client ' + client.id + 'disconnected',
    })
  }
  async handleConnection(client: SocketWithAuth, ...args: any[]) {
    this.userIdToSocketIdMap[client.userId] = client.id.toString()

    client.broadcast.emit('user_added', {
      description: 'new client, welcome ' + client.id,
    })
    await this.joinUsersToRooms(client)
  }
  // hook method
  async joinUsersToRooms(client: SocketWithAuth) {
    return
  }
}
