import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

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
}