import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { loginBody } from './dtos/login.dto.js';
import type { LoginDto } from './dtos/login.dto.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe.js';
import { ApiLogin } from './auth.docs.js';

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
}
