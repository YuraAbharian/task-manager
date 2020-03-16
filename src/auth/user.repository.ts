import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async singUp(createUserDto: CreateUserDto): Promise<void>{

        const { username, password } = createUserDto

        const user = new User();
        
        user.username = username;
        user.password = password;
        await user.save();
    }
}