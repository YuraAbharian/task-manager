import { TaskStatus } from '../task.model';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsNotEmpty()
  @IsIn([TaskStatus.OPEN, TaskStatus.DONE,TaskStatus.IN_PROGRES])
  status: TaskStatus;

}
