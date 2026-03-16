import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dtos/login.dto.js';
import { ApiError } from '../common/errors/api-error.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ApiError(401, 'Credenciais inválidas');
    }

    const passwordMatch = await compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new ApiError(401, 'Credenciais inválidas');
    }

    const payload = { sub: user.id, isAdmin: user.isAdmin };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
