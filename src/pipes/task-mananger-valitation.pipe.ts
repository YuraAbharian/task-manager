import { TaskStatus } from '../tasks/task.model';
import {  BadRequestException, PipeTransform } from '@nestjs/common';


export class TaskStatusValidation implements PipeTransform {

  readonly allowStatusValidation = [TaskStatus.DONE, TaskStatus.IN_PROGRES, TaskStatus.OPEN];

  transform(value: any){
    value = value.toUpperCase();
      if(!this.isStatusValid(value)) {
        throw new BadRequestException(`'${value}' is invalid value`)
      }
      return value
  }

  isStatusValid(value: any){
    const idx = this.allowStatusValidation.indexOf(value);
    return idx !== -1
  }

}
