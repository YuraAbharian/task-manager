import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async validateUserPassword(password: string): Promise<boolean>{
    const decodedPassword = await bcrypt.hash(password, this.salt);
    return this.password === decodedPassword;
  }
}