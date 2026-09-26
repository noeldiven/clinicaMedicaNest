import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    email: string,
    password: string,
    role: string,
  ) {
    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        role: role as any,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }

  async login(
    email: string,
    password: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      this.configService.get<string>('JWT_SECRET') as string,
      {
        expiresIn: '8h',
      },
    );

    return { token };
  }
}