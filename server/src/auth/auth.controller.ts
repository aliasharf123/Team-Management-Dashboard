import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { GoogleOAuthGuard } from './guard/google-oauth.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto)
  }

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.localSignUp(authDto)
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const googleToken = (await this.authService.googleSignUp(req.user))
      .access_token

    res.cookie('access_token', googleToken, { httpOnly: true })

    res.redirect('http://localhost:3000')
  }
}
