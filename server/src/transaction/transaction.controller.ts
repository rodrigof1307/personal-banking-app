import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Patch,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, DepositFundsDto } from './dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) {}

  @Post('deposit')
  async depositFunds(@Body() transactionDto: DepositFundsDto) {
    return this.transactionsService.depositFunds(transactionDto);
  }

  @Post('send')
  async sendTransaction(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(transactionDto);
  }

  @Patch('accept/:id')
  async confirmTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.acceptTransaction(id);
  }

  @Patch('reject/:id')
  async rejectTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.rejectTransaction(id);
  }

  @Get()
  async getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get('sent/:id')
  async getSentTransactions(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getTransactions(id, 'SENT');
  }

  @Get('received/:id')
  async getReceivedTransactions(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getTransactions(id, 'RECEIVED');
  }
}
