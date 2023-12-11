import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Role } from 'src/user/types'

export class InvitationDto {
  @IsEmail()
  @IsNotEmpty()
  sendToGmail: string

  @IsNotEmpty()
  @IsString()
  projectId: string

  @IsEnum(Role)
  @IsNotEmpty()
  role: string
}
