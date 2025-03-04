import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTaskDto, TaskResponseDto, UpdateTaskDto } from './tasks.dto';

type Task = {
  id: number;
  title: string;
  status: string;
  todoId: number;
};

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // создать таску
  async create(
    todoListId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        todoId: todoListId,
      },
    });
    return this.toTaskResponseDto(task);
  }

  // все таски
  async findAllByTodoListId(todoListId: number): Promise<TaskResponseDto[]> {
    const tasks = await this.prisma.task.findMany({
      where: { todoId: todoListId },
    });
    return tasks.map(this.toTaskResponseDto);
  }

  // одна таска
  async findOne(todoListId: number, id: number): Promise<TaskResponseDto> {
    const task = await this.prisma.task.findUnique({
      where: { id, todoId: todoListId },
    });
    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found in TodoList ${todoListId}`,
      );
    }
    return this.toTaskResponseDto(task);
  }

  // обновить таску
  async update(
    todoListId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.prisma.task.update({
      where: { id, todoId: todoListId },
      data: updateTaskDto,
    });
    return this.toTaskResponseDto(task);
  }

  // удалить таску
  async remove(todoListId: number, id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id, todoId: todoListId },
    });
  }

  private toTaskResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      todoId: task.todoId,
    };
  }
}
