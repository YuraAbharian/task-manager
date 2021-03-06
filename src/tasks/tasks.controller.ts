import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enam';
import { CreateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from '../pipes/task-mananger-valitation.pipe';
import { Task } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
     @GetUser() user: User
  ): Promise<Task[]> {
    return await this.tasksServices.getAllTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number,  @GetUser() user: User): Promise<Task> {
    return this.tasksServices.getTaskById(id, user);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number,  @GetUser()  user: User): Promise<void> {
    await this.tasksServices.deleteTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksServices.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidation) status: TaskStatus,
    @GetUser()  user: User
  ): Promise<Task> {
    return await this.tasksServices.updateTaskStatus(id, status,  user);
  }
}
