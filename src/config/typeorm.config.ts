import {  TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import * as path from 'path';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmananger',
  entities: [Task, User], 
  synchronize: true
};