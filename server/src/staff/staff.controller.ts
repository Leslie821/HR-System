import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('employees')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  async createNewEmployee(
    @Body()
    body: CreateStaffDto,
  ) {
    console.log("body:", body)
    let result = await this.staffService.createNewEmployee(body);
    return { result };
  }

  @Get("list")
  async findAll() {
    return this.staffService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.staffService.editEmployee(+id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.updateEmployee(+id, updateStaffDto);
  }

  @Get('/list/:query')
  async searchData(@Param("query") query: string) {
    console.log("query:", query);

    return this.staffService.searchData(query);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.staffService.remove(+id);
  //   // comment
  // }
}
