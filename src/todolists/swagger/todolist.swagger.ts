import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoDto } from '../dto/todolists.dto';
import { applyDecorators } from '@nestjs/common';

export const ApiTodoList = {
  tag: () => ApiTags('todos'),
  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all Todo List' }),
      ApiResponse({ status: 200, description: 'Request successfully' }),
      ApiResponse({ status: 404, description: 'Todo List not Found' }),
    ),
  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a todo list by ID' }),
      ApiResponse({
        status: 200,
        description: 'Todo List found',
        schema: {
          example: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            title: 'My Todo List',
            tasks: [
              {
                id: '550e8400-e29b-41d4-a716-446655440001',
                title: 'Buy groceries',
                status: 'Active',
              },
            ],
          },
        },
      }),
      ApiResponse({ status: 404, description: 'Todo List Not Found' }),
      ApiParam({ name: 'id', type: String, description: 'Todo List ID' }),
    ),

  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new todo list' }),
      ApiResponse({
        status: 201,
        description: 'Todo list created successfully',
      }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiBody({
        type: CreateTodoDto,
        description: 'Json structure for todo-list object',
      }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update Todo List Title' }),
      ApiResponse({ status: 201, description: 'Todo list Title Updated' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
    ),

  delete: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete Todo List' }),
      ApiResponse({ status: 201, description: 'Todo list has been delete' }),
      ApiResponse({ status: 404, description: 'Todo list not found' }),
    ),
};
