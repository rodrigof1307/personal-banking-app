import {
  IsEmail,
  IsIBAN,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  senderID: number;

  @IsOptional()
  @IsEmail()
  receiverEmail?: string;

  @IsOptional()
  @IsIBAN()
  receiverIBAN?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
