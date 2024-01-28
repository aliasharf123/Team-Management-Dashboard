import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { GatewayConnections } from 'src/gatewayConnections.gateway'
import { UseFilters, UseGuards, ValidationPipe } from '@nestjs/common'
import { AdminUserGuard } from 'src/auth/guard/admin-user.guard'
import { Namespace } from 'socket.io'
import { WsCatchAllFilter } from 'src/expections/ws-catch-all-filters'
import { RemoveTagDto } from './dto/remove-tag.dto'
import { CreateTagDto } from './dto/create-tag.dto'
import { AssignUserDto } from './dto/assign-user.dto'

@UseGuards(AdminUserGuard)
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway()
export class TaskGateway extends GatewayConnections {
  @WebSocketServer()
  private io: Namespace

  constructor(private readonly taskService: TaskService) {
    super()
  }
  @SubscribeMessage('createTask')
  create(@MessageBody(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @SubscribeMessage('updateTask')
  async update(
    @MessageBody(new ValidationPipe()) updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(updateTaskDto)
  }
  @SubscribeMessage('addTag')
  async addTag(@MessageBody(new ValidationPipe()) createTagDto: CreateTagDto) {
    return this.taskService.addTag(createTagDto)
  }
  @SubscribeMessage('removeTag')
  async removeTag(
    @MessageBody(new ValidationPipe()) removeTagDto: RemoveTagDto
  ) {
    return this.taskService.removeTag(removeTagDto)
  }
  @SubscribeMessage('assignUserTo')
  async assignUserTo(
    @MessageBody(new ValidationPipe()) assignUserDto: AssignUserDto
  ) {
    return this.taskService.assignUserTo(assignUserDto)
  }

  @SubscribeMessage('removeUser')
  removeUser(@MessageBody(new ValidationPipe()) removeTagDto: RemoveTagDto) {
    return
  }
}
