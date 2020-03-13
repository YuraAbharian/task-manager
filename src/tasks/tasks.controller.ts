import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/task.dto';
import { FilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {
  }

  @Get()
  searchTask(@Query() filterDto: FilterDto): Task[] {
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
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.tasksServices.updateTaskStatus(id, status);
  }
}
