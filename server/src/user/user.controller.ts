import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // This route handles the retrieval of a user's account
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  // This route handles the retrieval of all users
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
