import { knex } from './../../db';
import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { stringify } from 'querystring';

@Injectable()
export class StaffService {
  constructor(@InjectModel() private knex: Knex) { }

  async createNewEmployee(formInfo: CreateStaffDto) {

    try {
      let result = await this.knex('users')
        // .join('department', 'department', 'department.id')
        // .select('department', 'department.id')
        // .join('job_title', 'job_title', 'job_title.id')
        // .select('job_title', 'job_title.id')
        // .join('access_level', 'access_level', 'access_level.id')
        // .select('access_level', 'access_level.id')
        .insert({
          gender: formInfo.gender,
          name: formInfo.name,
          email: formInfo.email,
          address: formInfo.address,
          job_nature: formInfo.job_nature,
          username: formInfo.username,
          password: formInfo.password,
          contract: formInfo.contract,
          mpf: formInfo.mpf,
          birthday: formInfo.birthday,
          employ_date: formInfo.employ_date,
          termination_date: formInfo.termination_date,
          working_time: formInfo.working_time,
          salary: formInfo.salary,
          annual_leave_fixed: formInfo.annual_leave_fixed,
          sick_leave_fixed: formInfo.sick_leave_fixed,
          bank_account: formInfo.bank_account,
          phone: formInfo.phone,
          access_level_id: formInfo.access_level,
          job_title_id: formInfo.job_title,
          department_id: formInfo.department,
        })

      return result

    } catch (error) {

      console.log('insert employee:', error)
      return JSON.stringify(error)
    }

    return;
  }

  findAll() {
    return `This action returns all staff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
