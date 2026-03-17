import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { loginBody } from './dtos/login.dto.js';
import type { LoginDto } from './dtos/login.dto.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe.js';
import { ApiLogin, ApiGoogleRedirect, ApiGoogleCallback } from './auth.docs.js';
import { ApiError } from '../common/errors/api-error.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiLogin()
  @UsePipes(new ZodValidationPipe(loginBody))
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('google')
  @ApiGoogleRedirect()
  googleRedirect(@Res() res: Response) {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      response_type: 'code',
      scope: 'openid email profile',
    });

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
  }

  @Get('google/callback')
  @ApiGoogleCallback()
  async googleCallback(
    @Query('code') code: string,
    @Query('error') error: string,
  ) {
    if (error || !code) {
      throw new ApiError(401, 'Autenticação com Google cancelada');
    }

    return this.authService.googleLogin(code);
  }
}
