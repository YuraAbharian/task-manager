import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtInterface } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<void> {
    return await this.userRepository.singUp(createUserDto);
  }
  async singIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      createUserDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtInterface = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
