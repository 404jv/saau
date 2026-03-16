import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

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
