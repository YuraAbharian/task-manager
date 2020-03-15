import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks/task-status.enam';


export class TaskStatusValidation implements PipeTransform {

  readonly allowStatusValidation = [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN];

  transform(value: any, ){
    // console.log('metadata: ', metadata);
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
