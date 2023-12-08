import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AcceptInvitationDto {
  @IsString()
  @IsNotEmpty()
  @Length(12, 12)
  invitationId: string
}
