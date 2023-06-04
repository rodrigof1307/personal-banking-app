import { IsIBAN, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  senderID: number;

  @IsOptional()
  @IsNumber()
  receiverID?: number;

  @IsOptional()
  @IsIBAN()
  receiverIBAN?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
