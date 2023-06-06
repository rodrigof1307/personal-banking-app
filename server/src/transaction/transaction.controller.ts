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

  // This route handles the deposit of funds into a user's account
  @Post('deposit')
  async depositFunds(@Body() transactionDto: DepositFundsDto) {
    return this.transactionsService.depositFunds(transactionDto);
  }

  // This route handles the sending of funds from one user to another
  @Post('send')
  async sendTransaction(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(transactionDto);
  }

  // This route handles the acceptance of a transaction
  @Patch('accept/:id')
  async confirmTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.acceptTransaction(id);
  }

  // This route handles the rejection of a transaction
  @Patch('reject/:id')
  async rejectTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.rejectTransaction(id);
  }

  // This route handles the retrieval of all transactions from every account on the app
  @Get('all')
  async getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  // This route handles the retrieval of all transactions from a specific user
  @Get('all/:id')
  async getAllUserTransactions(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getAllUserTransactions(id);
  }
}
