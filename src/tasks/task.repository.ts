import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enam';
import { CreateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if(status){
     query.andWhere('task.status = :status', { status })
    }

    if(search){
     query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    return await query.getMany();
  }


  async createTask(createTaskDto: CreateTaskDto, @GetUser() user: User) {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    task.status = TaskStatus.OPEN;
    await task.save();
    delete task.user;
    return task;
  }
}