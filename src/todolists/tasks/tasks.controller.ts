import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskResponseDto, UpdateTaskDto } from './tasks.dto';

// используем вложенный маршрут
@Controller('todo-list/:todoListId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Param('todoListId', ParseIntPipe) todoListId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(todoListId, createTaskDto);
  }

  @Get()
  async findAll(
    @Param('todoListId', ParseIntPipe) todoListId: number,
  ): Promise<TaskResponseDto[]> {
    return this.tasksService.findAllByTodoListId(todoListId);
  }

  @Get(':id')
  async findOne(
    @Param('todoListId', ParseIntPipe) todoListId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(todoListId, id);
  }

  @Patch(':id')
  async update(
    @Param('todoListId', ParseIntPipe) todoListId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(todoListId, id, updateTaskDto);
  }

  @Delete(':id')
  async remove(
    @Param('todoListId', ParseIntPipe) todoListId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.tasksService.remove(todoListId, id);
  }
}
