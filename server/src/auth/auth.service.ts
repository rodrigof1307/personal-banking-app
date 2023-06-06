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
      // If there are no other users yet this line creates a test account so that users can interact
      if ((await this.prisma.userAccount.findMany()).length === 0) {
        const newHash = await argon.hash('Password123');
        await this.prisma.userAccount.create({
          data: {
            email: 'test@gmail.com',
            passwordHash: newHash,
            name: 'Test Account',
          },
        });
      }

      const user = await this.prisma.userAccount.create({
        data: {
          email: dto.email,
          passwordHash: hash,
          name: dto.name,
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
