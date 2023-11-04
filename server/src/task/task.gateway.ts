import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@WebSocketGateway({namespace : 'task'})
export class TaskGateway {
  constructor(private readonly taskService: TaskService) {}

  @SubscribeMessage('createTask')
  create(@MessageBody() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @SubscribeMessage('findAllTask')
  findAll() {
    return this.taskService.findAll();
  }

  @SubscribeMessage('findOneTask')
  findOne(@MessageBody() id: number) {
    return this.taskService.findOne(id);
  }

  @SubscribeMessage('updateTask')
  update(@MessageBody() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto.id, updateTaskDto);
  }

  @SubscribeMessage('removeTask')
  remove(@MessageBody() id: number) {
    return this.taskService.remove(id);
  }
}
