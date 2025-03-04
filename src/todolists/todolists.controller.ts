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
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseTodoDto> {
    return this.todolistsService.getTodoById(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<ResponseTodoDto> {
    return this.todolistsService.createTodoWithTasks(createTodoDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    return this.todolistsService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todolistsService.deleteTodo(id);
  }
}
