import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskGateway } from './task.gateway'
import { TaskRepository } from './task.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/task.schema'
import { TaskController } from './task.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskGateway, TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
