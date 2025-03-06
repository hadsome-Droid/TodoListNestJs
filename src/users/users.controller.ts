import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.register(createUserDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.login(loginUserDto);
  }
}
