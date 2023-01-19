import { Controller, Get, Ip, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('checkin')
export class CheckInController {
  @Get()
  findAll(@Ip() ip): any {
    console.log(ip);

    return 'ok';
  }
}
