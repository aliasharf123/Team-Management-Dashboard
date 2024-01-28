import { INestApplicationContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions } from 'socket.io'
import { SocketWithAuth } from './auth/types'
import { ConfigService } from '@nestjs/config'

export class SocketIoAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app)
  }
  createIOServer(port: number, options?: ServerOptions) {
    const jwtService = this.app.get(JwtService)
    const cors = {
      origin: [
        `http://localhost:3000`,
        new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):3000$/`),
      ],
    }
    const optionsWithCORS: ServerOptions = {
      ...options,
      cors,
    }
    const server: Server = super.createIOServer(port, optionsWithCORS)
    const secret = this.app.get(ConfigService).get('JWT_SECRET')
    console.log(server)
    server.use(createTokenMiddleware(jwtService, secret))
    return server
  }
}

const createTokenMiddleware =
  (jwtService: JwtService, secret: string) =>
  (socket: SocketWithAuth, next) => {
    // for Postman testing support, fallback to token header
    const token =
      socket.handshake.auth.token || socket.handshake.headers['token']

    if (!token) {
      next(new Error('FORBIDDEN'))
    }

    try {
      const payload = jwtService.verify(token.slice('Bearer '.length), {
        secret: secret,
      })
      socket.userId = payload.sub
      socket.username = payload.email
      next()
    } catch (err) {
      next(new Error(err.message))
    }
  }
