import { Controller, Get, Ip, Req } from '@nestjs/common';
import { Request } from 'express';
import { env } from 'env';
import { CheckInService } from './check_in.service';

@Controller('checkin')
export class CheckInController {
  constructor(private checkinService: CheckInService) {}
  @Get('in')
  async checkIn(@Req() request: Request) {
    console.log('request.ip:', request.ip);
    console.log('process.env.WifiIP:', process.env.WifiIP);
    if (request.ip == process.env.WifiIP) {
      let result = await this.checkinService.checkin(request.ip);
      // console.log('controller in result', result);
    } else {
      let result = await this.checkinService.checkin(request.ip);
      // console.log('controller in result', result);
    }
  }

  @Get('out')
  async checkOut() {
    let result = await this.checkinService.checkOut();
    // console.log('controller ****out**** result', result);
  }
}
