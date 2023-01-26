import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class LoginService {
  constructor(@InjectModel() private knex: Knex) {}
  async loginForm(body: { email: string; password: string }) {
    try {
      console.log('emil:', body.email);
      let user = await this.knex
        .select('email', 'password')
        .from('users')
        .where('email', body.email)
        .first();
      console.log('pw:', user[0].password);
      if (!user) throw new HttpException('Wrong Email', HttpStatus.BAD_REQUEST);

      // if (loginEmail === body.email && LoginPassword === body.password)
      //   return response.status(200).send();
    } catch (err) {
      throw new HttpException('DataBase error', HttpStatus.BAD_REQUEST);
    }
  }
}
