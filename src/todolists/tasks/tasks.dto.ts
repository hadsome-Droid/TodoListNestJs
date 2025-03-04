import { IsString, IsEnum, IsNumber } from 'class-validator';
import { StatusTask } from '../../type';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsEnum(StatusTask)
  status: StatusTask;

  @IsNumber()
  todoId: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class TaskResponseDto {
  id: string;
  title: string;
  status: string;
  todoId: string;
}
