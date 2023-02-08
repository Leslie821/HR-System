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
    formInfo: {
      name: string;
      type: string;
      userID: number;
      from: string;
      total: string;
    },
    file?: any,
  ) {
    try {
      // console.log('service:', formInfo);
      console.log('service userInfo', formInfo);

      let result = await this.knex
        .insert({
          staff_id: formInfo.userID,
          approved_staff_id: 1,
          leave_type_id: formInfo.type,
          start_date: new Date(formInfo.from),
          total_date: formInfo.total,
          remark: '',
          status: 'pending',
        })
        .into('leave_request')
        .returning('id');
      // console.log('result id:', result);

      if (file) {
        await this.knex
          .insert({
            req_id: result[0].id,
            pic: file,
          })
          .into('pic_request_leave')
          .returning('id');
      }

      // console.log('service: application', result, fileresult);

      // return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getapplicationstatuse(formInfo: any) {
    console.log('service id', formInfo);

    try {
      let result = await this.knex.raw(
        `SELECT leave_request.id,leave_request.created_at,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, remark,staff_id, name,staff_id,type,start_date,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, total_date, status FROM leave_request 
      JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE staff_id=?`,
        [formInfo.id],
      );

      // console.log('service get application status', result.rows);
      return result.rows;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getpendingApplication(formInfo: any) {
    try {
      let result = await this.knex.raw(
        `SELECT leave_request.id,leave_request.created_at,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, remark,staff_id, name,staff_id,type,start_date,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format,total_date, status FROM leave_request 
      JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE (status='pending')AND (staff_id=?)`,
        [formInfo.id],
      );

      // console.log('service get application status', result.rows);
      return result.rows;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getApprovedApplication(formInfo: any) {
    try {
      let result = await this.knex.raw(
        `SELECT leave_request.id,leave_request.created_at,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, remark,staff_id, name,staff_id,type,start_date,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format,total_date, status FROM leave_request 
      JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE (status='approved')AND (staff_id=?)`,
        [formInfo.id],
      );

      // console.log('service get application status', result.rows);
      return result.rows;
    } catch (error) {
      console.log('get type error', error);
    }
  }

  async updateApplication(formInfo: any) {
    try {
      for (let i = 0; i < formInfo.length; i++) {
        await this.knex
          .update({ status: 'approved' })
          .from('leave_request')
          .where('id', formInfo[i].id)
          .andWhere('status', 'pending');
      }
      // console.log('service update status', formInfo);

      return { status: true };
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
        `SELECT name,type,annual_leave_fixed, sick_leave_fixed, COUNT(type) AS dayoff_count FROM leave_request 
        JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE (name=?) AND (status='approved') 
        GROUP BY type,name,annual_leave_fixed, sick_leave_fixed`,
        [query],
      );

      return result.rows;
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }
  async deleteDayOffType(formInfo: any) {
    try {
      for (let i = 0; i < formInfo.length; i++) {
        await this.knex('leave_request')
          .where('leave_type_id', formInfo[i].id)
          .del();
        await this.knex('pic_request_leave')
          .where('req_id', formInfo[i].id)
          .del();
        await this.knex('leave_type').where('id', formInfo[i].id).del();
      }
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }

  async rejectApplication(formInfo: any) {
    try {
      // console.log(formInfo);

      await this.knex
        .update({ status: 'rejected', remark: formInfo.reject })
        .from('leave_request')
        .where('id', formInfo.rejectItem)
        .andWhere('status', 'pending')
        .returning('id');
    } catch (error) {
      console.log('get type error', error);
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
