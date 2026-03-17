import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { ListUsersQuery } from './dtos/list-users.dto.js';
import { ApiError } from '../common/errors/api-error.js';
import { hash } from 'bcrypt';
import { userPresenter } from './presenters/user.presenter.js';

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

    return userPresenter(user);
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

    return userPresenter(updatedUser);
  }

  async list(dto: ListUsersQuery) {
    const { query, page, limit } = dto;
    const skip = (page - 1) * limit;

    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { email: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users: users.map(userPresenter),
      total,
      page,
      limit,
    };
  }
}
