import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class DepositFundsDto {
  @IsOptional()
  @IsNotEmpty()
  receiverID: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
