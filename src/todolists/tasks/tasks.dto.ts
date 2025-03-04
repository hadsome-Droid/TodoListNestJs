import { IsString, IsEnum, IsNumber } from 'class-validator';
import { StatusTask } from '../../type';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @ ApiProperty({
    example: 'By a new Car',
    description: 'The title of the task',
    required: true,
  })
  title: string;

  @IsEnum(StatusTask)
  @ApiProperty({
    example: 'Active',
    description: 'The status of the task',
    enum: StatusTask,
    required: true
  })
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
