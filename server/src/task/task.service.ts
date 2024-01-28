import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskRepository } from './task.repository'
import { Task } from './schemas/task.schema'
import { ClientSession } from 'mongoose'
import { CreateTagDto } from './dto/create-tag.dto'
import { RemoveTagDto } from './dto/remove-tag.dto'
import { AssignUserDto } from './dto/assign-user.dto'

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}
  async create(createTaskDto: CreateTaskDto): Promise<any> {
    const createTask = await this.taskRepository.create(createTaskDto)

    // this.projectCommunication.sendEventToProjectNamespace(
    //   createTaskDto.projectId,
    //   createTask,
    //   'taskCreated'
    // )
    return createTask
  }
  getById(id: string) {
    return this.taskRepository.getById(id)
  }
  delete(id: string) {
    return this.taskRepository.delete(id)
  }
  async update(updateTaskDto: UpdateTaskDto) {
    const start = new Date().getTime()
    const updateTask = await this.taskRepository.update(updateTaskDto)
    // this.projectCommunication.sendEventToProjectNamespace(
    //   updateTask.project.toString(),
    //   updateTask,
    //   'taskUpdated'
    // )
    console.log(new Date().getTime() - start)
    return updateTask
  }
  async assignUserTo(assignUserDto: AssignUserDto): Promise<Task> {
    const start = new Date().getTime()

    const updateTask = await this.taskRepository.assignUserTo(assignUserDto)

    // this.projectCommunication.sendEventToProjectNamespace(
    //   updateTask.project.toString(),
    //   updateTask,
    //   'taskUpdated'
    // )

    console.log(new Date().getTime() - start)
    return updateTask
  }
  removeUser(
    userId: string,
    taskId: string,
    session?: ClientSession
  ): Promise<Task> {
    return this.taskRepository.removeUser(userId, taskId, session)
  }
  async addTag(createTagDto: CreateTagDto): Promise<Task> {
    const start = new Date().getTime()

    const updateTask = await this.taskRepository.addTag(createTagDto)

    // this.projectCommunication.sendEventToProjectNamespace(
    //   updateTask.project.toString(),
    //   updateTask,
    //   'taskUpdated'
    // )
    console.log(new Date().getTime() - start)
    return updateTask
  }
  async removeTag(removeTagDto: RemoveTagDto): Promise<Task> {
    const start = new Date().getTime()

    const updateTask = await this.taskRepository.removeTag(removeTagDto)

    // this.projectCommunication.sendEventToProjectNamespace(
    //   updateTask.project.toString(),
    //   updateTask,
    //   'taskUpdated'
    // )

    console.log(new Date().getTime() - start)
    return updateTask
  }
}
