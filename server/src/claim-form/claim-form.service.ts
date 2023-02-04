import { Injectable } from '@nestjs/common';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { UpdateClaimFormDto } from './dto/update-claim-form.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class ClaimFormService {
  constructor(@InjectModel() private knex: Knex) {}

  create(createClaimFormDto: CreateClaimFormDto) {
    return 'This action adds a new claimForm';
  }

  async findAll() {
    let managerList = await this.knex('users')
      .select(
        'users.name as users_name',
        'department.name as department_name',
        'users.id as users_id',
      )
      .join('department', 'users.department_id', 'department.id')
      .where('users.access_level_id', '<=', '2');
    return managerList;
  }

  findOne(id: number) {
    return `This action returns a #${id} claimForm`;
  }

  update(id: number, updateClaimFormDto: UpdateClaimFormDto) {
    return `This action updates a #${id} claimForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} claimForm`;
  }
}
