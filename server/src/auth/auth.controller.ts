import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
