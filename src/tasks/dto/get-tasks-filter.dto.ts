import { TaskStatus } from '../task-status.enam';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.DONE,TaskStatus.IN_PROGRESS])
  status: TaskStatus;

}
