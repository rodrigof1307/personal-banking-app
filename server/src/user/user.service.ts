import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
    const user = await this.prisma.userAccount.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }

  async getUsers() {
    return await this.prisma.userAccount.findMany();
  }
}
