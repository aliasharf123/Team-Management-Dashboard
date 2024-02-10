import { Module, Global } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import { UserRepository } from './user.repository'
import { redisModule } from 'src/redis/module.config'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
    redisModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
