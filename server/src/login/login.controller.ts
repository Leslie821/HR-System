import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

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
}
