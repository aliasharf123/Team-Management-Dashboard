import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common'
import { SocketWithAuth } from 'src/auth/types'
import {
  WsBadRequestException,
  WsTypeException,
  WsUnknownException,
} from './ws-filters'

@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: SocketWithAuth = host.switchToWs().getClient()
    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse()
      const exceptionMessage =
        exceptionData['message'] ?? exceptionData ?? exception.name

      const wsException = new WsBadRequestException(exceptionMessage)
      socket.emit('exception', wsException.getError())
      return
    }

    if (exception instanceof WsTypeException) {
      socket.emit('exception', exception.getError())
      return
    }

    const wsException = new WsUnknownException(exception.message)
    socket.emit('exception', wsException.getError())
  }
}
