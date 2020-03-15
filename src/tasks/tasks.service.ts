import { Injectable, NotFoundException, Param } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { TaskStatus } from './task-status.enam';
import { CreateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';


@Injectable()
export class TasksService {

  constructor(private taskRepository: TaskRepository) {
  }




 async getAllTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }


  async getTaskById(id: number): Promise<Task> {

    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with current ID '${id}' is not found`);
    }
    return found;
  }


  // searchTask(query: GetTaskFilterDto): Task[] {
  //   const { search, status } = query;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = this.tasks.filter(t => t.status === status);
  //   }
  //   if (search) {
  //     tasks = this.tasks.filter(task => task.description.includes(search) || task.title.includes(search));
  //   }
  //
  //   return tasks;
  // }
  //


  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void> {

    const deletedTask = await this.taskRepository.delete(id);
    if (deletedTask.affected === 0) {
      throw new NotFoundException(`Task with current ID '${id}' is not found`);
    }
  }

  //
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
