import { Controller, Get, Ip, Req } from '@nestjs/common';
import { Request } from 'express';
import { env } from 'env';

@Controller('checkin')
export class CheckInController {
  @Get()
  getIpAddressFromRequest(@Req() request: Request): string {
    console.log('request.ip:', request.ip);
    console.log('process.env.WifiIP:', process.env.WifiIP);
    if (request.ip == process.env.WifiIP) {
      return 'login successfully';
    } else {
      return 'failed';
    }
  }
}
