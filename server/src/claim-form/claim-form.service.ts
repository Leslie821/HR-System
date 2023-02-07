import { Injectable } from '@nestjs/common';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { UpdateClaimFormDto } from './dto/update-claim-form.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class ClaimFormService {
  constructor(@InjectModel() private knex: Knex) {}

  create(createClaimFormDto: CreateClaimFormDto) {
    console.log('HIHI:', createClaimFormDto);

    let insertInfo = this.knex
      .insert({
        staff_id: +createClaimFormDto.staff_id,
        approved_staff_id: +createClaimFormDto.submitTo,
        date: createClaimFormDto.date,
        type: createClaimFormDto.type,
        amount: +createClaimFormDto.amount,
        remark: createClaimFormDto.remark,
        status: 'pending',
      })
      .into('claim_request')
      .returning('id');
    return insertInfo;
  }

  async findManagerList() {
    let managerList = await this.knex('users')
      .select(
        'users.name as users_name',
        'department.department_name as department_name',
        'users.id as users_id',
      )
      .join('department', 'users.department_id', 'department.id')
      .where('users.access_level_id', '<=', '2');
    return managerList;
  }

  async findOne(id: number) {
    let myClaimForm = await this.knex('claim_request')
      .select('type', 'date', 'amount', 'remark', 'status')
      .where('staff_id', '=', id);
    return myClaimForm;
  }

  // async findApplication(id: number) {
  //   let Application = await this.knex('claim_request')
  //     .select('*')
  //     // .join('users', 'users.id',)
  //     .where('approved_staff_id', '=', id);
  //   return Application;
  // }

  async findAllClaimForms() {
    let AllApplications = await this.knex.select().from('claim_request');
    return AllApplications;
  }

  update(id: number, updateClaimFormDto: UpdateClaimFormDto) {
    return `This action updates a #${id} claimForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} claimForm`;
  }
}
