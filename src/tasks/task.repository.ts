import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enam';
import { CreateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if(status){
     await query.andWhere('task.status = :status', { status })
    }

    if(search){
     await query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
    }

    return await query.getMany();
  }


  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}