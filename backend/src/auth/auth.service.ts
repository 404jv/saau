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

    if (!user.password) {
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

  async googleLogin(code: string) {
    try {
      const tokenResponse = await fetch(
        'https://oauth2.googleapis.com/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
          }),
        },
      );

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error('Token exchange failed');
      }

      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        },
      );

      const userInfo = await userInfoResponse.json();

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      let user = await this.prisma.user.findUnique({
        where: { email: userInfo.email },
      });

      if (user) {
        if (!user.googleId) {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: { googleId: userInfo.id },
          });
        }
      } else {
        user = await this.prisma.user.create({
          data: {
            name: userInfo.name,
            email: userInfo.email,
            googleId: userInfo.id,
            gender: 'não informado',
          },
        });
      }

      const payload = { sub: user.id, isAdmin: user.isAdmin };
      const access_token = await this.jwtService.signAsync(payload);

      return { access_token };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(401, 'Falha na autenticação com Google');
    }
  }
}
