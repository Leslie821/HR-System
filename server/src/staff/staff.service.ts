import { knex } from './../../db';
import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { stringify } from 'querystring';
import * as bcrypt from 'bcrypt';
import { hashPassword } from '../../hash';

@Injectable()
export class StaffService {
  constructor(@InjectModel() private knex: Knex) {}

  //add
  async createNewEmployee(formInfo: CreateStaffDto) {
    try {
      // let departmentID = await this.knex('department').select('id')
      //   .where('department.name', "=", formInfo.department)
      // console.log("departmentID:", departmentID);

      // let jobTitleID = await this.knex('job_title').select('id')
      //   .where('job_title.type', "=", formInfo.job_title)
      // console.log("jobTitleID:", jobTitleID);

      // let accessLevel = await this.knex('department').select('id')
      //   .where('access_level.level', "=", formInfo.access_level)
      // console.log("accessLevel:", accessLevel);

      let insertUsers = await this.knex('users').insert({
        gender: formInfo.gender,
        name: formInfo.name,
        email: formInfo.email,
        address: formInfo.address,
        job_nature: formInfo.job_nature,
        username: formInfo.username,
        password: hashPassword(formInfo.password),
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
      });

      console.log('insert employee:', insertUsers);
      return insertUsers;
    } catch (error) {
      console.log('insert employee:', error);
      return JSON.stringify(error);
    }
  }

  //edit
  async editEmployee(id) {
    try {
      let thatUser = await this.knex('users').select().where('id', id);
      return thatUser;
    } catch (error) {
      console.log('Get employee:', error);
      return JSON.stringify(error);
    }
  }

  //update
  async updateEmployee(id, formInfo) {
    // try {
    let updatedUser = await this.knex('users').update({
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
    });
    // }
    //   catch {

    //   }
    // }
  }

  // findAll() {
  //   return `This action returns all staff`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} staff`;
  // }

  // update(id: number, updateStaffDto: UpdateStaffDto) {
  //   return `This action updates a #${id} staff`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} staff`;
  // }
}
