import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentGateway } from './comment.gateway'
import { CommentRepository } from './comment.repository'

@Module({
  providers: [CommentGateway, CommentService, CommentRepository],
})
export class CommentModule {}
