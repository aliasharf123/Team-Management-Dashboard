import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskGateway } from './task.gateway';

@Module({
  providers: [TaskGateway, TaskService],
})
export class TaskModule {}
