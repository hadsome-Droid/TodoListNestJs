import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import {
  CreateTodoDto,
  ResponseTodoDto,
  UpdateTodoDto,
} from './dto/todolists.dto';

@Controller('todo-list')
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @Get()
  async findAll(): Promise<ResponseTodoDto[]> {
    return this.todolistsService.getTodos();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseTodoDto> {
    return this.todolistsService.getTodoById(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<ResponseTodoDto> {
    return this.todolistsService.createTodoWithTasks(createTodoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    return this.todolistsService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.todolistsService.deleteTodo(id);
  }
}
