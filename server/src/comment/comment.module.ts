import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentGateway } from './comment.gateway'
import { CommentRepository } from './comment.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Comment, CommentSchema } from './schemas/comment.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentGateway, CommentService, CommentRepository],
})
export class CommentModule {}
