import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { StatusEnum } from '../types'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsDate()
  dueDate: Date

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum

  @IsNotEmpty()
  @IsString()
  project: string
}
