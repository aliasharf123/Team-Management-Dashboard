import { Module, Global } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
    UserService,
  ],
})
export class UserModule {}
