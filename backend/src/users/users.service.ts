import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { ApiError } from '../common/errors/api-error.js';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ApiError(409, 'E-mail já está em uso');
    }

    const hashedPassword = await hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        gender: dto.gender,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ApiError(404, 'Usuário não encontrado');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ApiError(409, 'E-mail já está em uso');
      }
    }

    const data: Record<string, unknown> = { ...dto };

    if (dto.password) {
      data.password = await hash(dto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }
}
