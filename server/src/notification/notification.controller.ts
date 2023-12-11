import { Controller, Put, Param, UseGuards, Delete } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { JwtAuthGuard } from 'src/auth/guard/auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Put('/markIsRead/:id')
  markIsRead(@Param('id') id: string) {
    return this.notificationService.markIsRead(id)
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id)
  }
}
