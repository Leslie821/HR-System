import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class CheckInService {
  constructor(@InjectModel() private knex: Knex) {}

  async checkin(userID: any, formInfo: any) {
    console.log('service in userID', userID);

    let inID = await this.knex
      .insert({ staff_id: userID.userID, ip_address: formInfo })
      .into('check_in_record')
      .returning('id');
    console.log('service in', inID);
    return { inID };
  }
  async checkOut(userID: any) {
    console.log('service out userID ', userID.userID);
    const toDayStr = new Date().toISOString().substring(0, 10);
    console.log('clock out ', toDayStr);

    let outID = await this.knex
      .update({ updated_at: new Date().toISOString() })
      .into('check_in_record')
      .where('created_at', '>', toDayStr + 'T00:00:00Z')
      .andWhere('created_at', '<', toDayStr + 'T23:59:59Z')
      .andWhere('staff_id', '=', userID.userID)
      .returning('id');
    console.log('service out', outID);

    return { outID };
  }
  async getCheckInOutRecord(body: any) {
    console.log('service user id', body);

    let result = await this.knex
      .select()
      .from('check_in_record')
      .where('staff_id', '=', body.userID);

    return result;
  }
}
