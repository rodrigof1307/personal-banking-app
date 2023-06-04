import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';
import { CreateTransactionDto, DepositFundsDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async depositFunds(dto: DepositFundsDto) {
    const { receiverID, amount } = dto;

    const user = await this.getUser(receiverID);

    await this.changeBalance(receiverID, user.balance + amount);

    return this.prisma.transaction.create({
      data: {
        receiverID,
        amount,
        status: TransactionStatus.ACCEPTED,
      },
    });
  }

  async createTransaction(dto: CreateTransactionDto) {
    const { senderID, receiverID, receiverIBAN, amount } = dto;

    if (receiverID && receiverIBAN) {
      throw new ForbiddenException(
        'Cannot provide both recipientId and recipientIban',
      );
    }

    if (!receiverID && !receiverIBAN) {
      throw new ForbiddenException('No IBAN nor receipient provided');
    }

    const user = await this.getUser(senderID);

    if (user.balance < amount) {
      throw new ForbiddenException('Insufficient funds');
    }

    if (receiverID) {
      // Transactions to other users are settled immediately

      const recipient = await this.prisma.userAccount.findUnique({
        where: {
          id: receiverID,
        },
      });

      if (!recipient) {
        throw new ForbiddenException('Recipient not found');
      }

      await this.changeBalance(senderID, user.balance - amount);
      await this.changeBalance(receiverID, recipient.balance + amount);

      return this.prisma.transaction.create({
        data: {
          senderID,
          receiverID,
          receiverIBAN,
          status: TransactionStatus.ACCEPTED,
          amount,
        },
      });
    } else {
      // Transactions to other banks remain pending

      await this.changeBalance(senderID, user.balance - amount);

      return this.prisma.transaction.create({
        data: {
          senderID,
          receiverID,
          receiverIBAN,
          status: TransactionStatus.PENDING,
          amount,
        },
      });
    }
  }

  async acceptTransaction(transactionId: number) {
    const transaction = await this.getTransaction(transactionId);

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new ForbiddenException('Transaction is not pending');
    }

    if (transaction.receiverID) {
      await this.prisma.userAccount.update({
        where: {
          id: transaction.receiverID,
        },
        data: {
          balance: {
            increment: transaction.amount,
          },
        },
      });
    }

    return await this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: TransactionStatus.ACCEPTED,
      },
    });
  }

  async rejectTransaction(transactionId: number) {
    const transaction = await this.getTransaction(transactionId);

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new ForbiddenException('Transaction is not pending');
    }

    await this.prisma.userAccount.update({
      where: {
        id: transaction.senderID,
      },
      data: {
        balance: {
          increment: transaction.amount,
        },
      },
    });

    return await this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: TransactionStatus.REJECTED,
      },
    });
  }

  async getAllTransactions() {
    return await this.prisma.transaction.findMany();
  }

  async getTransactions(accountID: number, type: 'SENT' | 'RECEIVED') {
    await this.getUser(accountID);

    if (type === 'SENT') {
      return await this.prisma.transaction.findMany({
        where: {
          senderID: accountID,
        },
      });
    }

    return await this.prisma.transaction.findMany({
      where: {
        receiverID: accountID,
      },
    });
  }

  private async changeBalance(userAccountId: number, amount: number) {
    return await this.prisma.userAccount.update({
      where: {
        id: userAccountId,
      },
      data: {
        balance: amount,
      },
    });
  }

  private async getUser(userAccountId: number) {
    const user = await this.prisma.userAccount.findUnique({
      where: {
        id: userAccountId,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }

  private async getTransaction(transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      throw new ForbiddenException('Transaction not found');
    }

    return transaction;
  }
}