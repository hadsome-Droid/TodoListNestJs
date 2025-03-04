import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTaskDto } from '../tasks/tasks.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks: CreateTaskDto[];
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}

export class ResponseTodoDto {
  id: string;
  title: string;
  tasks: CreateTaskDto[];
}
