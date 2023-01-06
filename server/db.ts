/* eslint-disable prettier/prettier */
import Knex from 'knex';
import { env } from './env'


// eslint-disable-next-line @typescript-eslint/no-var-requires
const profiles = require('./knexfile')
// console.log(profiles)

const config = profiles[env.NODE_ENV]

export const knex = Knex(config)
