import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class JobTitleService {
  constructor(@InjectModel() private knex: Knex) { }

  async getDepartmentid() {
    try {
      let result = await this.knex.select().from('department')
      console.log('service get dayoff', result);
      return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getAllJobTitle() {
    try {
      let result = await this.knex.select("*").from('job_title')
        .join('department', { 'department.id': 'job_title.department_id' });
      console.log('service Get jbo title ID', result);
      return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async createNewJobTitle(body) {
    try {
      let result = await this.knex
        .insert({
          job_title_type: body.type,
          department_id: body.departmentId,
        })
        .into('job_title');
      console.log('service create new jbo title', body.departmentId);
      // return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
}
