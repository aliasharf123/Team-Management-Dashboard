import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteProjectDto {
  @IsNotEmpty()
  @IsString()
  id: string
}
