import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @Post('loginInfo')
  async loginForm(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    let result = await this.loginService.loginForm(body);
    try {
      if (!body.email) {
        throw new HttpException('Missing Info', HttpStatus.BAD_REQUEST);
      }
      if (!body.password) {
        throw new HttpException('Missing Info', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException('server error', HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
