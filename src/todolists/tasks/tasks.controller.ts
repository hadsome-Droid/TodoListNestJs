import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    @Param('todoListId') todoListId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(todoListId, createTaskDto);
  }

  @Get()
  async findAll(
    @Param('todoListId') todoListId: string,
  ): Promise<TaskResponseDto[]> {
    return this.tasksService.findAllByTodoListId(todoListId);
  }

  @Get(':id')
  async findOne(
    @Param('todoListId') todoListId: string,
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(todoListId, id);
  }

  @Patch(':id')
  async update(
    @Param('todoListId') todoListId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(todoListId, id, updateTaskDto);
  }

  @Delete(':id')
  async remove(
    @Param('todoListId') todoListId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.tasksService.remove(todoListId, id);
  }
}
