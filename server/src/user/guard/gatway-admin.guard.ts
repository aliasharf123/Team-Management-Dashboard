import {
  CanActivate,
  Injectable,
  ExecutionContext,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthPayload, SocketWithAuth } from 'src/auth/types'
import {
  WsUnauthorizedException,
  WsUnknownException,
} from 'src/expections/ws-filters'

@Injectable()
export class GatewayJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private config: ConfigService) {}
  canActivate(context: ExecutionContext) {
    const socket: SocketWithAuth = context.switchToWs().getClient()

    const token = socket.handshake.headers['authorization']

    if (!token) {
      Logger.error('No authorization token provided')
      throw new WsUnauthorizedException('no token provided')
    }
    const secret = this.config.get('JWT_SECRET')
    try {
      const payload = this.jwtService.verify<AuthPayload>(
        token.slice('Bearer '.length),
        { secret: secret }
      )

      return true
    } catch (err) {
      throw new WsUnknownException(err.message)
    }
  }
}
