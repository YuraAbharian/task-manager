import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException, UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;

    const user = new User();
    user.username = username;

    try {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('User with the username is already exist');
      } else {
        throw new InternalServerErrorException('Something goes wrong');
      }
    }
  }

  async validateUserPassword(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = await this.findOne({ username });
    if (user) {
      const validPassword = await user.validateUserPassword(password);
      if(!validPassword){
        throw new UnauthorizedException('Password or Email is invalid');
      }
      return username
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
