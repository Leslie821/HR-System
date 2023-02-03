import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClaimFormService } from './claim-form.service';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { UpdateClaimFormDto } from './dto/update-claim-form.dto';

@Controller('claim-form')
export class ClaimFormController {
  constructor(private readonly claimFormService: ClaimFormService) {}

  @Post('apply')
  create(@Body() createClaimFormDto: CreateClaimFormDto) {
    if (!CreateClaimFormDto) {
      return { status: false, message: 'Missing Information' };
    } else {
      return console.log(createClaimFormDto);

      // this.claimFormService.create(createClaimFormDto);
    }
  }

  @Get('list')
  findAll() {
    return this.claimFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimFormService.findOne(+id);
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
