import { IsString, IsEnum } from 'class-validator';
import { StatusTask } from '../../type';

export class TaskDto {
  @IsString()
  title: string;

  @IsEnum(StatusTask)
  status: StatusTask;
}
