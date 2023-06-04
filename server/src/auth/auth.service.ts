import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.userAccount.create({
        data: {
          email: dto.email,
          passwordHash: hash,
          name: dto.name,
          phone: dto.phone,
          occupation: dto.occupation,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already used');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.userAccount.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Wrong credentials');
    }

    const isPasswordValid = await argon.verify(user.passwordHash, dto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong credentials');
    }

    return user;
  }
}
