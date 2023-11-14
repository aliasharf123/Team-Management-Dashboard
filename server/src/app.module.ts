import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseConfig } from './mongooseModule';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';

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
  ],
})
export class AppModule {}
