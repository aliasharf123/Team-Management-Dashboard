import { ForbiddenException } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { ClientSession, Connection } from 'mongoose'
export class SessionService {
  constructor(@InjectConnection() private connection: Connection) {}

  async startSession<T>(cb: (session: ClientSession) => T) {
    const session = await this.connection.startSession()

    try {
      session.startTransaction()

      const value = await cb(session)

      await session.commitTransaction()

      return value
    } catch (err) {
      await session.abortTransaction()
      throw new ForbiddenException(err.message)
    } finally {
      await session.endSession()
    }
  }
}
