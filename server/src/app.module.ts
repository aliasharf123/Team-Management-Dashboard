import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { MongooseConfig } from './mongooseModule'
import { ProjectModule } from './project/project.module'
import { TaskModule } from './task/task.module'
import { JwtModule } from '@nestjs/jwt'
import { CommentModule } from './comment/comment.module'
import { SessionService } from './session.service'
import { NotificationModule } from './notification/notification.module'
import { redisModule } from './redis/module.config'
import { KafkaModule } from './kafka/kafka.module'
import { ConsumerService } from './kafka/consume.service'
import { ConsumerModule } from './kafka/consume.module'

@Global()
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    MongooseConfig,
    // KafkaModule.register({
    //   clientId: 'test-app-client',
    //   brokers: ['localhost:9092'],
    //   groupId: 'test-app-group',
    // }),
    // ConsumerModule,
    UserModule,
    ProjectModule,
    TaskModule,
    CommentModule,
    NotificationModule,
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class AppModule {}
