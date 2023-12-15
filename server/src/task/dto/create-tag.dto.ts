import { IsNotEmpty, IsRgbColor, IsString } from 'class-validator'

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsRgbColor()
  @IsNotEmpty()
  color: string
}
