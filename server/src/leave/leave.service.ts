import { Injectable } from '@nestjs/common';
import { info } from 'console';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class LeaveService {
  constructor(@InjectModel() private knex: Knex) {}
  async createNewDayoffType(formInfo: {
    dayoff_name: string;
    short_form: string;
    one_time_day_off: string;
    pay_leave: string;
  }) {
    // console.log('service: createNewDayoffTyep', formInfo);
    try {
      let id = await this.knex
        .insert({
          type: formInfo.dayoff_name,
          short_form: formInfo.short_form,
          one_time_day_off: formInfo.one_time_day_off === 'Yes',
          pay_leave: formInfo.pay_leave === 'Yes',
        })
        .into('leave_type')
        .returning('id');

      return id;
    } catch (error) {
      console.log('create dayoff type error', error);
    }
  }
  async getDayoffType() {
    try {
      let result = await this.knex.select().from('leave_type');
      // console.log('service get dayoff', result);
      return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async submitapplication(
    file: any,
    formInfo: {
      name: string;
      type: string;
      reason: string;
      from: string;
      total: string;
    },
  ) {
    try {
      // console.log('service', formInfo);

      let result = await this.knex
        .insert({
          staff_id: 1,
          approved_staff_id: 1,
          leave_type_id: formInfo.type,
          start_date: new Date(formInfo.from),
          total_date: formInfo.total,
          status: 'pending',
          remark: formInfo.reason,
        })
        .into('leave_request')
        .returning('id');

      let fileresult = await this.knex
        .insert({
          req_id: result[0].id,
          pic: file,
        })
        .into('pic_request_leave')
        .returning('id');
      // console.log('service: application', result, fileresult);

      // return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getapplicationstatuse() {
    try {
      let result = await this.knex.select().from('leave_request');
      // console.log('service get application status', result);
      return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async updateApplication(formInfo: any) {
    try {
      for (let i = 0; i < formInfo.length; i++) {
        await this.knex
          .update({ status: 'Approved' })
          .from('leave_request')
          .where('id', formInfo[i].id)
          .andWhere('status', 'Pending');
      }
      // console.log('service update status', result);
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getdayofftye() {
    try {
      let result = await this.knex.select().from('leave_type');
      // console.log('service select tyep', result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  ///////////////////////////select group by
  async getstaffalsl(query: string) {
    try {
      // console.log('query from service', query);

      let result = await this.knex.raw(
        `SELECT username,staff_id,type,COUNT(type) AS dayoff_count FROM leave_request 
        JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE staff_id=? AND status="Approved" 
        GROUP BY staff_id,type`,
        [query],
      );

      return result.rows;
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }
  //////////////////////////////////
}

//wordable sytax ////
// let result = await this.knex.raw(
//   `select staff_id,leave_type_id,count(leave_type_id)as dayoff_count
//   from leave_request
//   where  (staff_id = ?)
//   and (status='Approved')
//   group by staff_id,leave_type_id`,
//   [query],
// );
