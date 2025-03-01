import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskDto } from '../tasks/tasks.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks: TaskDto[];
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}

export class ResponseTodoDto {
  id: number;
  title: string;
  tasks: TaskDto[];
}
