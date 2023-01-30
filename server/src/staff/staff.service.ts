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
  constructor(@InjectModel() private knex: Knex) { }

  //add
  async createNewEmployee(formInfo: CreateStaffDto) {
    try {
<<<<<<< HEAD
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
=======
      const saltOrRounds = 10;
      const password = formInfo.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      console.log('hash:', hash);
      let insertUsers = await this.knex('users')
        .insert({
          gender: formInfo.gender,
          name: formInfo.name,
          email: formInfo.email,
          address: formInfo.address,
          job_nature: formInfo.job_nature,
          password: hash,
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
>>>>>>> 85bc1ebe5d5ee89e14b6b1cf1e1af270b0f4e23c

      console.log("insert employee:", insertUsers);
      return insertUsers
    }

    catch (error) {
      console.log('insert employee:', error)
      return JSON.stringify(error)
    }
  }

  //edit
  async editEmployee(id) {
    try {
      let thatUser = await this.knex('users')
        .where('users.id', id)
        .select(
          "*",
        )
        .join('department', { 'department.id': 'users.department_id' })
        .join('job_title', { 'job_title.id': 'users.job_title_id' })
        .join('access_level', { 'access_level.id': 'users.access_level_id' })

      return thatUser
    }
    catch (error) {
      console.log('Get employee:', error)
      return JSON.stringify(error)
    }
  }

  //update
  async updateEmployee(id, formInfo) {
    console.log(id, formInfo);
    try {
      let updatedUser = await this.knex('users')
        .update({
          gender: formInfo.gender,
          name: formInfo.name,
          email: formInfo.email,
          address: formInfo.address,
          job_nature: formInfo.job_nature,
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
        .where("users.id", id)

      return updatedUser

    }
    catch (error) {
      console.log('Update employee:', error)
      return JSON.stringify(error)
    }
  }

  async getUsers() {
    try {
      let usersList = await this.knex('users')
        .select("*", "users.id",)
        .join('department', { 'department.id': 'users.department_id' })
        .join('job_title', { 'job_title.id': 'users.job_title_id' })
        .join('access_level', { 'access_level.id': 'users.access_level_id' })

      return usersList
    }
    catch (error) {
      console.log('Get UserList:', error)
      return JSON.stringify(error)
    }
  }

  async searchData(query: string) {
    try {
      // console.log("query back:", query);
      let searchData = await this.knex("users")
        .select("*", "users.id")
        .join('department', { 'department.id': 'users.department_id' })
        .join('job_title', { 'job_title.id': 'users.job_title_id' })
        .where('name', 'ilike', `%${query}%`)
        .orWhere('email', 'ilike', `%${query}%`)
      console.log(searchData)
      return searchData
    }
    catch (error) {
      console.log('search Data:', error)
      return JSON.stringify(error)
    }
  }

}