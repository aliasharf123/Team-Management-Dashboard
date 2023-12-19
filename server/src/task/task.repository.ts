import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task } from './schemas/task.schema'
import { ClientSession, Model, Types } from 'mongoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { CreateTagDto } from './dto/create-tag.dto'
import { RemoveTagDto } from './dto/remove-tag.dto'
import { AssignUserDto } from './dto/assign-user.dto'

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  create(createTaskDto: CreateTaskDto): Promise<any> {
    try {
      createTaskDto['createdAt'] = new Date()
      const createTaskObject = {
        ...createTaskDto,
        project: new Types.ObjectId(createTaskDto.projectId),
      }
      const createdTask = new this.taskModel(createTaskObject)

      return createdTask.save()
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
  async getById(id: string) {
    try {
      const task = await this.taskModel.findById(new Types.ObjectId(id)).exec()
      if (!task) throw new NotFoundException('Task not found')

      return task
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async delete(id: string) {
    try {
      const deletedTask = await this.taskModel.deleteOne({ _id: id })

      if (deletedTask.deletedCount == 0) {
        throw new NotFoundException('Task not found')
      }
      return deletedTask
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
  async update(updateTaskDto: UpdateTaskDto) {
    try {
      updateTaskDto['updateAt'] = new Date()
      const task = await this.taskModel.findOneAndUpdate(
        { _id: updateTaskDto.id },
        { $set: updateTaskDto },
        { new: true }
      )

      if (!task) {
        throw new NotFoundException(
          `Task with ID ${updateTaskDto.id} not found`
        )
      }

      return task
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async assignUserTo(assignUserDto: AssignUserDto): Promise<Task> {
    try {
      const { taskId, userId } = assignUserDto
      const task = await this.taskModel.findOneAndUpdate(
        { _id: taskId, assignTo: { $ne: userId } },
        { $push: { assignTo: userId } },
        { new: true }
      )
      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found`)
      }

      return task
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async removeUser(
    userId: string,
    taskId: string,
    session?: ClientSession
  ): Promise<Task> {
    try {
      const task = await this.taskModel.findOneAndUpdate(
        { _id: taskId },
        { $pull: { assignTo: { user: userId } } },
        { new: true, session: session }
      )

      if (!task) {
        throw new NotFoundException(`task with ID ${task} not found`)
      }

      return task
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async addTag(createTagDto: CreateTagDto): Promise<Task> {
    try {
      const task = await this.taskModel.findOneAndUpdate(
        { _id: createTagDto.taskId },
        { $push: { tags: createTagDto.tag } },
        { new: true }
      )

      if (!task) {
        throw new NotFoundException(`task with ID ${task} not found`)
      }

      return task
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async removeTag(removeTagDto: RemoveTagDto): Promise<Task> {
    try {
      const task = await this.taskModel.findOneAndUpdate(
        { _id: removeTagDto.taskId },
        { $pull: { tags: { _id: removeTagDto.tagId } } },
        { new: true }
      )

      if (!task) {
        throw new NotFoundException(`task with ID ${task} not found`)
      }

      return task
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async getProjectTasks(projectId: string): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find({
        project: new Types.ObjectId(projectId),
      })

      if (!tasks) {
        throw new NotFoundException('project not found')
      }

      return tasks
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
