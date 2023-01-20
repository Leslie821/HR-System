import { Controller, Get, Ip, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('checkin')
export class CheckInController {
  @Get()
  getIpAddressFromRequest(@Req() request: Request): string {
    console.log(request.ip);
    if (request.ip == 'xxx') {
      return 'login successfully';
    } else {
      return 'failed';
    }
  }
}
