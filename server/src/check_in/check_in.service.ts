import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class CheckInService {
  constructor(@InjectModel() private knex: Knex) {}

  async checkin(formInfo) {
    let inID = await this.knex
      .insert({ staff_id: 1, ip_address: formInfo })
      .into('check_in_record')
      .returning('id');
    console.log('service in', inID);
    return { inID };
  }
  async checkOut() {
    const toDayStr = new Date().toISOString().substring(0, 10);
    let outID = await this.knex
      .update({ updated_at: new Date() })
      .into('check_in_record')
      .where('created_at', '>', toDayStr + 'T00:00:00Z')
      .andWhere('created_at', '<', toDayStr + 'T23:59:59Z')

      .returning('id');
    console.log('service out', outID);

    return { outID };
  }
}
