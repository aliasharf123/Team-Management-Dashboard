import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
    providers:[AuthService  , JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
