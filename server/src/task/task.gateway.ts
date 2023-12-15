import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@WebSocketGateway({ namespace: 'task' })
export class TaskGateway {
  constructor(private readonly taskService: TaskService) {}
}
