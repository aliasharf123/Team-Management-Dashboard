import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseConfig } from './mongooseModule';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentModule } from './comment/comment.module';
import { NotifictionModule } from './notifiction/notifiction.module';

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
    UserModule,
    ProjectModule,
    TaskModule,
    CommentModule,
    NotifictionModule,
  ],
})
export class AppModule {}
