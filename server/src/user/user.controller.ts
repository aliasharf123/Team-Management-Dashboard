import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guard/auth.guard'
import { UserService } from './user.service'
import { GetUser } from 'src/auth/decorator/get-user-controller.decorator'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getInfo(@GetUser('userId') userId: string) {
    return this.userService.getUserById(userId)
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
