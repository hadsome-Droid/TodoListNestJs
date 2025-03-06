import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import {
  CreateTodoDto,
  ResponseTodoDto,
  UpdateTodoDto,
} from './dto/todolists.dto';
import { ApiTodoList } from './swagger/todolist.swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users/me/todo-list')
@UseGuards(JwtAuthGuard)
@ApiTodoList.tag()
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @Get()
  @ApiTodoList.findAll()
  async findAll(@Request() req): Promise<ResponseTodoDto[]> {
    const userId = req.user.userId;
    return this.todolistsService.getTodosUser(userId);
  }

  @Get(':id')
  @ApiTodoList.findOne()
  async findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<ResponseTodoDto> {
    const userId = req.user.userId;
    const todoList = this.todolistsService.getTodoById(userId, id);
    if (!todoList) {
      throw new NotFoundException(`TodoList with ID ${id} not found`);
    }
    return todoList;
  }

  @Post()
  @ApiTodoList.create()
  async create(
    @Request() req,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ResponseTodoDto> {
    const userId = req.user.userId;
    return this.todolistsService.createTodoWithTasks(userId, createTodoDto);
  }

  @Patch(':id')
  @ApiTodoList.update()
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    const userId = req.user.userId;
    return this.todolistsService.updateTodo(userId, id, updateTodoDto);
  }

  @Delete(':id')
  @ApiTodoList.delete()
  async remove(@Request() req, @Param('id') id: string): Promise<void> {
    const userId = req.user.userId;
    return this.todolistsService.deleteTodo(userId, id);
  }
}
