import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
// import { object, email, string } from 'cast.ts';
import { loginInfo } from './auto.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      if (!body.email) return { status: false, message: 'no email' };

      if (!body.password) return { status: false, message: 'no password' };

      return await this.authService.login(body);
    } catch (error) {
      throw new HttpException('400', HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('login')
  // async login(@Body() body: unknown) {
  //   let parser = object({
  //     email: email(),
  //     password: string(),
  //   });

  //   let user = parser.parse(body);
  //   return this.authService.login(user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('test')
  async test() {
    return 'todo';
  }
}

function IsNotEmpty() {
  throw new Error('Function not implemented.');
}
