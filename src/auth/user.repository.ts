import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async singUp(createUserDto: CreateUserDto): Promise<void>{

        const { username, password } = createUserDto;

        try {
            const user = new User();

            user.username = username;
            user.password = password;
            await user.save();
        } catch (e) {
             if(e.code === '23505'){
                throw new ConflictException('User with the username is already exist');
             } else {
                throw new InternalServerErrorException('Something goes wrong')
             }
        }

    }
}