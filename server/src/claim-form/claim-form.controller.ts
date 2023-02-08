import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClaimFormService } from './claim-form.service';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { UpdateClaimFormDto } from './dto/update-claim-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/multerOptions';

@Controller('claim-form')
export class ClaimFormController {
  constructor(private readonly claimFormService: ClaimFormService) { }

  // @Post('apply')
  // create(@Body() createClaimFormDto: CreateClaimFormDto) {
  //   if (!CreateClaimFormDto) {
  //     throw new HttpException('Missing Info', HttpStatus.BAD_REQUEST);
  //   } else {
  //     return this.claimFormService.create(createClaimFormDto);
  //   }
  // }

  @Post('apply')
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createClaimFormDto: CreateClaimFormDto,
  ) {
    // console.log(total);
    try {
      let result: any;
      console.log('file:', file);
      if (file) {
        result = await this.claimFormService.create(
          createClaimFormDto,
          file.filename,
        );
      } else {
        result = await this.claimFormService.create(createClaimFormDto);
      }

      return { result };
    } catch (error) {
      console.log('error:', error);

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

  @Get('list')
  findManagerList() {
    return this.claimFormService.findManagerList();
  }

  @Get('showPersonalClaimForm:id') //睇自己
  findOne(@Param('id') id: string) {
    return this.claimFormService.findOne(+id);
  }

  // @Get('approved :id')
  // findApplication(@Param('id') id: string) {
  //   return this.claimFormService.findApplication(+id);
  // }

  // @Get('allApplications')
  // findAllApplications() {
  //   console.log('*********');

  //   return this.claimFormService.findAllApplications();
  // }
  @Get('allClaimForms')
  findAllClaimForms() {
    return this.claimFormService.findAllClaimForms();
  }
  @Patch('accept')
  accept(@Body() { id }: { id: number }) {
    console.log(id);
    console.log(typeof id);

    return this.claimFormService.accept(id);
  }
  @Patch('reject')
  reject(@Body() { id }: { id: number }) {
    console.log(id);
    console.log(typeof id);

    return this.claimFormService.reject(id);
  }
}
