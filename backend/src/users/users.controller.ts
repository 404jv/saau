import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { UsersService } from './users.service.js';
import { createUserBody } from './dtos/create-user.dto.js';
import type { CreateUserDto } from './dtos/create-user.dto.js';
import { updateUserBody } from './dtos/update-user.dto.js';
import type { UpdateUserDto } from './dtos/update-user.dto.js';
import { listUsersQuery } from './dtos/list-users.dto.js';
import type { ListUsersQuery } from './dtos/list-users.dto.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { ApiCreateUser, ApiUpdateUser, ApiListUsers } from './users.docs.js';
import { ApiError } from '../common/errors/api-error.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiListUsers()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async list(
    @Query(new ZodValidationPipe(listUsersQuery)) query: ListUsersQuery,
    @Req() req: Request,
  ) {
    const user = req['user'];

    if (!user.isAdmin) {
      throw new ApiError(403, 'Acesso restrito a administradores');
    }

    return this.usersService.list(query);
  }

  @Post()
  @ApiCreateUser()
  @UsePipes(new ZodValidationPipe(createUserBody))
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @ApiUpdateUser()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserBody)) body: UpdateUserDto,
    @Req() req: Request,
  ) {
    const user = req['user'];

    if (!user.isAdmin && user.sub !== id) {
      throw new ApiError(403, 'Sem permissão para atualizar este usuário');
    }

    return this.usersService.update(id, body);
  }
}
