import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enam';
import { CreateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number,  user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({where: { id, userId: user.id }});

    if (!found) {
      throw new NotFoundException(`Task with current ID '${id}' is not found`);
    }
    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const deletedTask = await this.taskRepository.delete({userId: user.id, id});
    if (deletedTask.affected === 0) {
      throw new NotFoundException(`Task with current ID '${id}' is not found`);
    }
  }

  //
  async updateTaskStatus(id: number, status: TaskStatus,  user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
