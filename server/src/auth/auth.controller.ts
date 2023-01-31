import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Headers,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
// import { object, email, string } from 'cast.ts';
import { loginInfo } from './auto.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: loginInfo) {
    return this.authService.login(body);
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
