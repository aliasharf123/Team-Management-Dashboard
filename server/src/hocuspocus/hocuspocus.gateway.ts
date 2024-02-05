import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Namespace } from 'socket.io'
import { HocuspocusKey } from './hocuspocus.module'
import { Inject } from '@nestjs/common'
@WebSocketGateway()
export class HocuspocusGateway {
  @WebSocketServer()
  io: Namespace
  constructor(@Inject(HocuspocusKey) private readonly hocuspocusServer: any) {}

  @SubscribeMessage('collaboration')
  async collaboration() {
    return
  }
}
