import {
  IsHexColor,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Tag } from '../types'
import { Type } from 'class-transformer'

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  taskId: string

  @IsNotEmpty()
  @IsString()
  projectId: string

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TagDto)
  tag: Tag
}
export class TagDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsHexColor()
  @IsNotEmpty()
  color: string
}
