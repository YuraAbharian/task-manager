import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksServices.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.tasksServices.getTaskById(id);
  }


  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void{
     this.tasksServices.deleteTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
      return this.tasksServices.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string,  @Body('status') status: TaskStatus): Task{
    console.log(id);
    console.log(status);
    return this.tasksServices.updateTaskStatus(id, status);
  }
}
