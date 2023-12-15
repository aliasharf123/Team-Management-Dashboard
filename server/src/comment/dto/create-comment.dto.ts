import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsString()
  commentBy: string

  @IsNotEmpty()
  @IsString()
  task: string

  @IsString()
  reply: string
}
