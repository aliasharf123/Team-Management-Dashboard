import { Injectable, ForbiddenException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { AuthDto } from './dto/auth.dto'
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async localSignUp(authDto: AuthDto) {
    try {
      // hash a password
      const hash = await argon.hash(authDto.password)
      // detecte if email is used before
      const userDetected = Boolean(await this.FindUser(authDto.email))
      if (userDetected) {
        throw new ForbiddenException('Email is already taken')
      }

      // create a new user in database
      const createUser = new this.userModel({
        email: authDto.email,
        password: hash,
      })

      // add a user to database
      createUser.save()
      return this.signToken(createUser._id.toString(), createUser.email)
    } catch (e) {
      throw e
    }
  }

  async googleSignUp(authDto: any) {
    try {
      // detecte if email is used before
      const userDetected = await this.FindUser(authDto.email)
      if (userDetected)
        return this.signToken(userDetected._id.toString(), userDetected.email)

      // create a new user in database
      const createUser = new this.userModel(authDto)

      // add a user to database
      createUser.save()
      return this.signToken(createUser._id.toString(), createUser.email)
    } catch (e) {
      throw e
    }
  }
  async signIn(authDto: AuthDto) {
    try {
      const user = (await this.FindUser(authDto.email)) as
        | (User & { _id: ObjectId })
        | undefined

      if (!user) {
        throw new ForbiddenException('email not found')
      }
      if (await argon.verify(user.password, authDto.password)) {
        return this.signToken(user._id.toString(), user.email)
      } else {
        throw new ForbiddenException('password not correct')
      }
    } catch (e) {
      throw e
    }
  }

  async FindUser(email: string): Promise<User> {
    return this.userModel.findOne({ email: email })
  }

  async signToken(
    userId: string,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }
    const secret = this.config.get('JWT_SECRET')

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '16000m',
      secret: secret,
    })
    return { access_token }
  }
}
