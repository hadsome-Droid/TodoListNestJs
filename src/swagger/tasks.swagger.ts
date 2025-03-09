import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const ApiTasks = {
  tag: () => ApiTags('tasks'),
  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all tasks' }),
      ApiResponse({ status: 200, description: 'Request successfully' }),
      ApiResponse({ status: 404, description: 'Tasks Not Found' }),
    ),
  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a Task by ID' }),
      ApiResponse({
        status: 200,
        description: 'Task found',
        schema: {
          example: {
            id: '550e8400-e29b-41d4-a716-446655440001',
            title: 'Buy groceries',
            status: 'Active',
          },
        },
      }),
      ApiResponse({ status: 404, description: 'Task Not Found' }),
    ),
  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new task' }),
      ApiResponse({ status: 201, description: 'Task created' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
    ),
  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update task' }),
      ApiResponse({status: 201, description: 'Task updated'}),
      ApiResponse({ status: 400, description: 'Bad Request' }),
    )
    ,
  delete: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete a task' }),
      ApiResponse({ status: 201, description: 'Task deleted successfully' }),
      ApiResponse({ status: 404, description: 'Task Not Found' }),
    ),
};
