import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskGateway } from './task.gateway'
import { TaskRepository } from './task.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/task.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskGateway, TaskService, TaskRepository],
})
export class TaskModule {}
