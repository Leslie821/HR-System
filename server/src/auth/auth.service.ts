import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { checkPassword } from 'hash';
import { JwtPayload } from 'src/jwt-payload/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel() private knex: Knex,
    private jwtService: JwtService,
  ) {}

  async login(input: { email: string; password: string }) {
    let user = await this.knex
      .select('id', 'email', 'password')
      .from('users')
      .where('email', input.email)
      .first();
    if (!user) throw new HttpException('Wrong Email', HttpStatus.BAD_REQUEST);

    let isMatched = await checkPassword(input.password, user.password);

    if (!isMatched)
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);

    const payload: JwtPayload = {
      id: user.id,
      emil: user.emil,
      access_level_id: user.access_level``,
    };
    let token = this.jwtService.sign(payload);
    return {
      token,
    };
  }
}
