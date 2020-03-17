import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sing-up')
  async singUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<void> {
    return await this.authService.singUp(createUserDto);
  }

  @Post('sing-in')
  async singIn(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.singIn(createUserDto);
  }


}
