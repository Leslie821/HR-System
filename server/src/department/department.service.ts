import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateDepartmentDto } from './dto/create-department.dto';


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
    console.log("formInfo", formInfo)
    try {
      let departmentValue = await this.knex('department')
        .insert({
          department_name: formInfo.data.departmentName,
          father_department_id: formInfo.data.parentDepartment,
        })
      return departmentValue
    }
    catch (e) {
      console.log("createNewDeportment", e)
      return JSON.stringify(e)
    }
  }
}
