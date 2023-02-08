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
} from '@nestjs/common';
import { ClaimFormService } from './claim-form.service';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { UpdateClaimFormDto } from './dto/update-claim-form.dto';

@Controller('claim-form')
export class ClaimFormController {
  constructor(private readonly claimFormService: ClaimFormService) { }

  @Post('apply')
  create(@Body() createClaimFormDto: CreateClaimFormDto) {
    if (!CreateClaimFormDto) {
      throw new HttpException('Missing Info', HttpStatus.BAD_REQUEST);
    } else {
      return this.claimFormService.create(createClaimFormDto);
    }
  }

  // @Get('list')
  // findManagerList() {
  //   return this.claimFormService.findManagerList();
  // }

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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClaimFormDto: UpdateClaimFormDto,
  ) {
    return this.claimFormService.update(+id, updateClaimFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimFormService.remove(+id);
  }
}
