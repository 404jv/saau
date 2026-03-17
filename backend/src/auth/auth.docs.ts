import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Authenticate user' }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'Login successful' }),
    ApiResponse({ status: 400, description: 'Validation failed' }),
    ApiResponse({ status: 401, description: 'Invalid credentials' }),
  );
}

export function ApiGoogleRedirect() {
  return applyDecorators(
    ApiOperation({ summary: 'Redirect to Google consent screen' }),
    ApiResponse({ status: 302, description: 'Redirects to Google OAuth' }),
  );
}

export function ApiGoogleCallback() {
  return applyDecorators(
    ApiOperation({ summary: 'Google OAuth callback' }),
    ApiResponse({ status: 200, description: 'Google login successful' }),
    ApiResponse({
      status: 401,
      description: 'Google authentication failed or cancelled',
    }),
  );
}
