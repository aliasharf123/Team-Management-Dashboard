import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentGateway } from './comment.gateway';

@Module({
  providers: [CommentGateway, CommentService],
})
export class CommentModule {}
