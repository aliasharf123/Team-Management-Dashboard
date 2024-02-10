import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guard/auth.guard'
import { UserService } from './user.service'
import { GetUser } from 'src/auth/decorator/get-user-controller.decorator'
import { KafkaPayload } from 'src/kafka/kafka.message'
import { KafkaService } from 'src/kafka/kafka.service'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getInfo(@GetUser('userId') userId: string) {
    return this.userService.getUserById(userId)
    // const payload: KafkaPayload = {
    //   messageId: '' + new Date().valueOf(),
    //   body: { name: 'ali ashraf ali' },
    //   messageType: 'Say.Hello',
    //   topicName: 'hello.topic',
    // }
    // const value = await this.kafkaService.sendMessage('hello.topic', payload)
    // console.log('kafka status ', value)
  }
  @Get('notification')
  getNotification(@GetUser('userId') userId: string) {
    return this.userService.getNotifications(userId)
  }
  @Get('project')
  getProjects(@GetUser('userId') userId: string) {
    return this.userService.getProjects(userId)
  }
}
