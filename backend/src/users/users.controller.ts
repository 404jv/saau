import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
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
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { ApiCreateUser, ApiUpdateUser } from './users.docs.js';
import { ApiError } from '../common/errors/api-error.js';

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
