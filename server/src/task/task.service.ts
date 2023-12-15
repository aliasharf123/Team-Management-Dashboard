import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskRepository } from './task.repository'
import { Task } from './schemas/task.schema'
import { ClientSession } from 'mongoose'

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto): Promise<any> {
    return this.taskRepository.create(createTaskDto)
  }
  getById(id: string) {
    return this.taskRepository.getById(id)
  }
  delete(id: string) {
    return this.taskRepository.delete(id)
  }
  update(updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(updateTaskDto)
  }
  assignUserTo(id: string, userId: string): Promise<Task> {
    return this.taskRepository.assignUserTo(id, userId)
  }
  removeUser(
    userId: string,
    taskId: string,
    session?: ClientSession
  ): Promise<Task> {
    return this.taskRepository.removeUser(userId, taskId, session)
  }
  async addTag(taskId: string, createTagDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.addTag(taskId, createTagDto)
  }
  async removeTag(tagId: string, taskId: string): Promise<Task> {
    return this.taskRepository.removeTag(taskId, taskId)
  }
}
