import { Body, Controller, Get, Ip, Post, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from 'env';
import { CheckInService } from './check_in.service';

@Controller('checkin')
export class CheckInController {
  constructor(private checkinService: CheckInService) {}
  @Post('in')
  async checkIn(@Req() request: Request, @Body() body) {
    console.log('userID:', body);
    console.log('request.ip:', request.ip);
    console.log('process.env.WifiIP:', process.env.WifiIP);
    if (request.ip == process.env.WifiIP) {
      await this.checkinService.checkin(body, request.ip);
      return { result: 'Success' };
      // console.log('controller in result', result);
    } else {
      await this.checkinService.checkin(body, request.ip);
      return { result: 'Fail' };
      // console.log('controller in result', result);
    }
  }

  @Post('out')
  async checkOut(@Body() body) {
    await this.checkinService.checkOut(body);
    return { result: 'Success' };
    // console.log('controller ****out**** result', result);
  }
  @Post('getRecord')
  async getCheckInOutRecord(@Body() body) {
    let result = await this.checkinService.getCheckInOutRecord(body);
    return result;
    // console.log('controller ****out**** result', result);
  }
}
