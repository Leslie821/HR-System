import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('employees')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async createNewEmployee(
    @Body()
    body: CreateStaffDto,
  ) {
    let result = await this.staffService.createNewEmployee(body);
    return { result };
  }

  // @Get()
  // findAll() {

  //   return this.staffService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.staffService.editEmployee(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.updateEmployee(+id, updateStaffDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.staffService.remove(+id);
  //   // comment
  // }
}
