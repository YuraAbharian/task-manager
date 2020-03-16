import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto{
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    username: string;
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z)(?=.*[a-z]).*$/, { message: `Password is incorrect. Password must contain letters and numbers` })
    password: string;
}