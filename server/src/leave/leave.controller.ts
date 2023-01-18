import { Body, Controller, Post, Get, Query } from '@nestjs/common';

import { LeaveService } from './leave.service';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Post('applyDayoff')
  async createNewDayoffType(
    @Body()
    body: {
      dayoff_name: string;
      short_form: string;
      one_time_dayoff: string;
      paid_leave: string;
    },
  ) {
    // console.log('controller newDayofftype', body);
    let result = await this.leaveService.createNewDayoffType(body);

    return { result };
  }
  @Get('getdayofftype')
  async getDayoffType() {
    let result = await this.leaveService.getDayoffType();
    // console.log('controller Get newDayofftype', result);

    return result;
  }
  @Post('application')
  async submitapplication(
    @Body()
    body: any, // info: any;
  ) // from: string;
  // to: string;
  // total: number;
  {
    console.log('controller application ', body);
    let result = await this.leaveService.submitapplication(body);

    return { result };
  }
  @Get('getapplicationstatus')
  async getapplicationstatus() {
    let result = await this.leaveService.getapplicationstatuse();

    return result;
  }
  @Post('updateapplication')
  async updateApplication(
    @Body()
    body: {},
  ) {
    console.log('controller ', body);

    let result = await this.leaveService.updateApplication(body);

    return result;
  }
  @Get('gettype')
  async getdayofftye() {
    let result = await this.leaveService.getdayofftye();

    // console.log('controller result for select type ', result);
    return result;
  }
  @Get('getstaffalsl')
  async getstaffalsl(@Query() query) {
    // console.log('qurty from controller', typeof query.qq);

    let result = await this.leaveService.getstaffalsl(query.qq);
    // console.log('controller result for select type ', result);

    return result;
  }
}
