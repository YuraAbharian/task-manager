import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/task.dto';
import { FilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from '../pipes/task-mananger-valitation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: FilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksServices.searchTask(filterDto);
    } else {
      return this.tasksServices.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksServices.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidation) status: TaskStatus): Task {
    return this.tasksServices.updateTaskStatus(id, status);
  }
}
