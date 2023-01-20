import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LeaveService } from './leave.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { fileOptions } from 'src/multerOptions';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

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
    try {
      // console.log('controller newDayofftype', body);
      let result = await this.leaveService.createNewDayoffType(body);

      return { result };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to add new dayoff type',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Get('getdayofftype')
  async getDayoffType() {
    try {
      let result = await this.leaveService.getDayoffType();
      // console.log('controller Get newDayofftype', result);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load dayoff type from DataBase',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Post('application')
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    // console.log(body);

    // console.log(file);
    // console.log(from);
    // console.log(total);
    try {
      let result = await this.leaveService.submitapplication(
        file.filename,
        body,
      );

      return { result };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to upload file',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('getapplicationstatus')
  async getapplicationstatus() {
    try {
      let result = await this.leaveService.getapplicationstatuse();
      // console.log('controller application list from db', result);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load application status',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Post('updateapplication')
  async updateApplication(
    @Body()
    body: {},
  ) {
    // console.log('controller ', body);
    try {
      let result = await this.leaveService.updateApplication(body);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to update application',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Get('gettype')
  async getdayofftye() {
    try {
      let result = await this.leaveService.getdayofftye();

      // console.log('controller result for select type ', result);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to update get dayoff type for selection',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Get('getstaffalsl')
  async getstaffalsl(@Query() query) {
    console.log('qurty from controller', typeof query.qq);
    try {
      let result = await this.leaveService.getstaffalsl(query.qq);
      // console.log('controller result for select type ', result);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load staff dayoff status',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
