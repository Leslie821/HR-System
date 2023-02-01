import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(@InjectModel() private knex: Knex) { }

  async fetchDepartment() {
    try {
      let departmentList = await this.knex('department')
        .select("*")
      console.log(departmentList);
      return departmentList
    }
    catch (e) {
      console.log('Get department:', e)
      return JSON.stringify(e)
    }
  }

  async createNewDeportment(formInfo: CreateDepartmentDto) {
    try {
      let departmentValue = await this.knex('department')
        .insert({
          department_name: formInfo.department,
          father_department_id: formInfo.father_department,
        })
      return departmentValue
    }
    catch (e) {
      console.log("createNewDeportment", e)
      return JSON.stringify(e)
    }
  }

}