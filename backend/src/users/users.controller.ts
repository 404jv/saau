import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { createUserBody } from './dtos/create-user.dto.js';
import type { CreateUserDto } from './dtos/create-user.dto.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe.js';
import { ApiCreateUser } from './users.docs.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiCreateUser()
  @UsePipes(new ZodValidationPipe(createUserBody))
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
}
