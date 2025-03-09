import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { LoginUserDTO } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

export const ApiAuth = {
  tag: () => ApiTags('Auth'),
  register: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Register a new User',
      }),
      ApiResponse({ status: 200, description: 'Request successfully' }),
      ApiResponse({
        status: 409,
        description: 'This password or email already exists',
      }),
      ApiBody({
        type: CreateUserDto,
        description: 'Create new user with name, email and password',
      }),
    ),
  login: () =>
    applyDecorators(
      ApiOperation({ summary: 'Authorize on the service' }),
      ApiResponse({ status: 200, description: 'Request successfully' }),
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiBody({
        type: LoginUserDTO,
        description: 'Auth User',
      }),
    ),
};
