import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiAuth } from '../swagger/auth.swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
@ApiAuth.tag()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiAuth.register()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiAuth.login()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
