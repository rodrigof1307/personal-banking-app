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
    delete user.passwordHash;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }

  async getUsers() {
    const users = await this.prisma.userAccount.findMany();
    users.forEach((user) => {
      delete user.passwordHash;
    });
    return users;
  }
}
