import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { LeaveService } from './leave.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { fileOptions } from 'src/multerOptions';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) { }

  @Post('addDayofftype')
  async createNewDayoffType(
    @Body()
    body: {
      dayoff_name: string;
      short_form: string;
      one_time_day_off: string;
      pay_leave: string;
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
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    // console.log(body);

    // console.log(file);
    // console.log(from);
    // console.log(total);

    let result = await this.leaveService.submitapplication(file.filename, body);

    return { result };
  }

  @Get('getapplicationstatus')
  async getapplicationstatus() {
    let result = await this.leaveService.getapplicationstatuse();
    console.log('controller application list from db', result);

    return result;
  }
  @Post('updateapplication')
  async updateApplication(
    @Body()
    body: {},
  ) {
    // console.log('controller ', body);

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
