import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authsService: AuthService) {
    }

    @Post('sing-up')
    async singUp(@Body() createUserDto: CreateUserDto): Promise<void>{
        return await this.authsService.singUp(createUserDto)
    }
}
