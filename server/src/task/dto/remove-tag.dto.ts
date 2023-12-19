import { IsNotEmpty, IsString } from 'class-validator'

export class RemoveTagDto {
  @IsNotEmpty()
  @IsString()
  taskId: string

  @IsNotEmpty()
  @IsString()
  tagId: string

  @IsNotEmpty()
  @IsString()
  projectId: string
}
