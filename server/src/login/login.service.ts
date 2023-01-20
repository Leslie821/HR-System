import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class LoginService {
  constructor(@InjectModel() private knex: Knex) {}
  async loginForm(body: { email: string; password: string }) {
    try {
    } catch {}
  }
}
