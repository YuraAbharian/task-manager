import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  salt: string;
  @Column()
  password: string;

  @OneToMany(type => Task, task => task.user, { eager: true } )
  tasks: Task[];


  async validateUserPassword(password: string): Promise<boolean>{
    const decodedPassword = await bcrypt.hash(password, this.salt);
    return this.password === decodedPassword;
  }
}