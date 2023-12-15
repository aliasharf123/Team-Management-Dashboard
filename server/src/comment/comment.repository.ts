import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Comment } from './schemas/comment.schema'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      createCommentDto['createdAt'] = new Date()

      const createdComment = new this.commentModel(createCommentDto)

      return createdComment.save()
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
  async getById(id: string) {
    try {
      const comment = await this.commentModel
        .findById(new Types.ObjectId(id))
        .exec()
      if (!comment) throw new NotFoundException('Comment not found')

      return comment
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async delete(id: string) {
    try {
      const deletedComment = await this.commentModel.deleteOne({ _id: id })

      if (deletedComment.deletedCount == 0) {
        throw new NotFoundException('Comment not found')
      }
      return deletedComment
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
  async update(updateCommentDto: UpdateCommentDto) {
    try {
      updateCommentDto['updateAt'] = new Date()
      const comment = await this.commentModel.findOneAndUpdate(
        { _id: updateCommentDto.id },
        { $set: updateCommentDto },
        { new: true }
      )

      if (!comment) {
        throw new NotFoundException(
          `Comment with ID ${updateCommentDto.id} not found`
        )
      }

      return comment
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
  async getTaskComment(taskId: string): Promise<Comment[]> {
    try {
      const comments = await this.commentModel.find({
        task: taskId,
        reply: { $exists: false },
      })

      if (!comments) {
        throw new NotFoundException(`task with ID ${taskId} not found`)
      }
      return comments
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
  async getCommentReplies(commentId: string): Promise<Comment[]> {
    try {
      const replies = await this.commentModel.find({ reply: commentId })

      if (!replies) {
        throw new NotFoundException(`comment with ID ${commentId} not found`)
      }
      return replies
    } catch (err) {
      throw new ForbiddenException(err.message)
    }
  }
}
