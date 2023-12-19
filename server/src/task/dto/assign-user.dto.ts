import { IsNotEmpty, IsString } from 'class-validator'

export class AssignUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  projectId: string

  @IsNotEmpty()
  @IsString()
  taskId: string
}
