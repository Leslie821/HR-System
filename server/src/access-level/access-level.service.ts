import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class AccessLevelService {
    constructor(@InjectModel() private knex: Knex) { }

    async fetchAccessLevel() {
        try {
            let accessLevel = await this.knex('access_level')
                .select("*")
            console.log(accessLevel);
            return accessLevel
        }
        catch (e) {
            console.log('Get accessLevel:', e)
            return JSON.stringify(e)
        }
    }

}
