import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/task.dto';


@Injectable()
export class TasksService {

  private tasks: Task[] = [];


  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task{
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto) {
const { title, description } = createTaskDto;

    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void{
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task{
    const task =  this.getTaskById(id);
    task.status = status;
    return task;
  }
}
