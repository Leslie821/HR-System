import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class LoginService {
  constructor(@InjectModel() private knex: Knex) {}
  loginForm(body: { username: string; password: string }) {
    console.log(body);
    return body;
  }
}
