import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { CommentRepository } from './comment.repository'
import { Comment } from './schemas/comment.schema'

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.create(createCommentDto)
  }
  getById(id: string): Promise<Comment> {
    return this.commentRepository.getById(id)
  }
  delete(id: string) {
    return this.commentRepository.delete(id)
  }
  update(updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(updateCommentDto)
  }
  getTaskComment(taskId: string): Promise<Comment[]> {
    return this.commentRepository.getTaskComment(taskId)
  }
  getCommentReplies(commentId: string): Promise<Comment[]> {
    return this.commentRepository.getCommentReplies(commentId)
  }
}
