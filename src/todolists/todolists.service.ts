import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateTodoDto,
  ResponseTodoDto,
  UpdateTodoDto,
} from './dto/todolists.dto';

@Injectable()
export class TodolistsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodoWithTasks(
    userId: string,
    createTodoDto: CreateTodoDto,
  ): Promise<ResponseTodoDto> {
    const { title, tasks } = createTodoDto;
    const todo = await this.prisma.todo.create({
      data: {
        title,
        userId,
        tasks: {
          create: tasks,
        },
      },
      include: {
        tasks: true,
      },
    });
    return this.toTodoResponseDto(todo);
  }

  async getTodosUser(userId: string): Promise<ResponseTodoDto[]> {
    const todos = await this.prisma.todo.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
    return todos.map(this.toTodoResponseDto);
  }

  async getTodoById(userId: string, id: string): Promise<ResponseTodoDto> {
    const todo = await this.prisma.todo.findUnique({
      where: { id, userId },
      include: {
        tasks: true,
      },
    });
    if (!todo) {
      throw new NotFoundException(`TodoList with ID ${id} not found`);
    }
    return this.toTodoResponseDto(todo);
  }

  async updateTodo(
    userId: string,
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    const todoList = await this.prisma.todo.findUnique({
      where: { id, userId },
    });
    if (!todoList) {
      throw new NotFoundException(`TodoList with ID ${id} not found`);
    }
    const { title, tasks } = updateTodoDto;
    const todo = await this.prisma.todo.update({
      where: { id },
      data: {
        title,
        tasks: {
          create: tasks,
        },
      },
      include: {
        tasks: true,
      },
    });
    return this.toTodoResponseDto(todo);
  }

  async deleteTodo(userId: string, id: string): Promise<void> {
    const todoList = await this.prisma.todo.findUnique({
      where: { id, userId },
    });
    if (!todoList) {
      throw new NotFoundException(`TodoList with ID ${id} not found`);
    }

    await this.prisma.todo.delete({
      where: { id },
    });
  }

  private toTodoResponseDto(todo: any): ResponseTodoDto {
    return {
      id: todo.id,
      title: todo.title,
      tasks: todo.tasks,
    };
  }

  // findAll() {
  //   return this.prisma.todo.findMany();

  // return [
  //   {
  //     id: 1,
  //     title: 'Test Todo',
  //     tasks: [
  //       {
  //         id: 1,
  //         title: 'Test Task One',
  //         status: StatusTask.Active,
  //       },
  //       {
  //         id: 2,
  //         title: 'Test Task Second',
  //         status: StatusTask.Completed,
  //       },
  //     ],
  //   },
  // ];
  // }
}
