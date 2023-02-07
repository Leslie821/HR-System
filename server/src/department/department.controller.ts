import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Get('list')
  async fetchDepartment() {
    let result = await this.departmentService.fetchDepartment()
    return result
  }

  @Post("/create")
  async createNewEmployee(
    @Body()
    body: CreateDepartmentDto,
  ) {
    console.log();

    console.log("BBBBBBB", body);

    let result = await this.departmentService.createNewDeportment(body);
    return { result };
  }

}
