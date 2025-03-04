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
    createTodoDto: CreateTodoDto,
  ): Promise<ResponseTodoDto> {
    const { title, tasks } = createTodoDto;
    const todo = await this.prisma.todo.create({
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

  async getTodos(): Promise<ResponseTodoDto[]> {
    const todos = await this.prisma.todo.findMany({
      include: {
        tasks: true,
      },
    });
    return todos.map(this.toTodoResponseDto);
  }

  async getTodoById(id: number): Promise<ResponseTodoDto> {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
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
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
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

  async deleteTodo(id: number): Promise<void> {
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
