import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SocketIoAdapter } from './socket-io-adapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // filter body from any unexpected data
    })
  )
  app.useWebSocketAdapter(new SocketIoAdapter(app))
  app.enableCors()
  await app.listen(3333)
}
bootstrap()
