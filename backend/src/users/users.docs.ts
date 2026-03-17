import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['name', 'gender', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 4, maxLength: 120 },
          gender: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6, maxLength: 32 },
        },
      },
    }),
    ApiResponse({ status: 201, description: 'User created successfully' }),
    ApiResponse({ status: 400, description: 'Validation failed' }),
    ApiResponse({ status: 409, description: 'Email already in use' }),
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 4, maxLength: 120 },
          gender: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6, maxLength: 32 },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'User updated successfully' }),
    ApiResponse({ status: 400, description: 'Validation failed' }),
    ApiResponse({ status: 401, description: 'Not authenticated' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 409, description: 'Email already in use' }),
  );
}

export function ApiListUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'List users (admin only)' }),
    ApiQuery({ name: 'query', required: false, type: String, description: 'Search by name or email' }),
    ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)' }),
    ApiResponse({ status: 200, description: 'Users listed successfully' }),
    ApiResponse({ status: 401, description: 'Not authenticated' }),
    ApiResponse({ status: 403, description: 'Forbidden — admin only' }),
  );
}
