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
    one_time_dayoff: string;
    paid_leave: string;
  }) {
    // console.log('service: createNewDayoffTyep', formInfo);
    try {
      let id = await this.knex
        .insert({
          type: formInfo.dayoff_name,
          short_form: formInfo.short_form,
          one_time_day_off: formInfo.one_time_dayoff,
          pay_leave: formInfo.paid_leave,
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
      let result = await this.knex.select().from('dayoff_type');
      // console.log('service get dayoff', result);
      return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async submitapplication(
    formInfo: {}, // info: any;
  ) // from: string;
  // to: string;
  // total: number;
  {
    try {
      console.log('service', formInfo);

      // let result = await this.knex
      //   .insert({
      //     staffid: 1,
      //     name: formInfo.info.name,
      //     dayoff_type: formInfo.info.type,
      //     from: formInfo.from,
      //     to: formInfo.to,
      //     day_length: formInfo.total,
      //     status: 'Pending',
      //     reason: formInfo.info.reason,
      //   })
      //   .into('leave_status')
      //   .returning('id');
      // console.log('service: application', result);

      // return result;
    } catch (error) {
      console.log('get type error', error);
    }
  }
  async getapplicationstatuse() {
    try {
      let result = await this.knex.select().from('leave_status');
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
          .from('leave_status')
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
      let result = await this.knex.select('short_form').from('dayoff_type');
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
        `select name,dayoff_type,count(dayoff_type)as dayoff_count 
        from leave_status  
        where  (name = ?)
        and (status='Approved') 
        group by name,dayoff_type`,
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
