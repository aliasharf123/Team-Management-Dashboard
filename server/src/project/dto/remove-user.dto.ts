import { IsNotEmpty, IsString } from 'class-validator'

export class RemoveUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  projectId: string
}
