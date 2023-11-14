import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user-controller.decorator';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Get()
    getInfo(@GetUser('userId') userId : string){
        return this.userService.getInfo(userId);
    }
    
}
