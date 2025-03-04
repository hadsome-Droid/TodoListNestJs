import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { ApiTodoList } from './swagger/todolist.swagger';

@Controller('todo-list')
@ApiTodoList.tag()
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @Get()
  @ApiTodoList.findAll()
  async findAll(): Promise<ResponseTodoDto[]> {
    return this.todolistsService.getTodos();
  }

  @Get(':id')
  @ApiTodoList.findOne()
  async findOne(@Param('id') id: string): Promise<ResponseTodoDto> {
    const todoList = this.todolistsService.getTodoById(id);
    if (!todoList) {
      throw new NotFoundException(`TodoList with ID ${id} not found`);
    }
    return todoList;
  }

  @Post()
  @ApiTodoList.create()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<ResponseTodoDto> {
    return this.todolistsService.createTodoWithTasks(createTodoDto);
  }

  @Patch(':id')
  @ApiTodoList.update()
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    return this.todolistsService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiTodoList.delete()
  async remove(@Param('id') id: string): Promise<void> {
    return this.todolistsService.deleteTodo(id);
  }
}
