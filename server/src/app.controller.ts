import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
