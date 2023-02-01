import { config } from 'dotenv';
import populateENV from 'populate-env';

config();

// eslint-disable-next-line prefer-const
export let env = {
<<<<<<< HEAD
  NODE_ENV: '',
  DB_NAME: '',
  DB_USER: '',
  DB_PASSWORD: '',
  POSTGRES_HOST: '',
  DB_HOST: '',
  POSTGRES_DB: '',
  POSTGRES_USER: '',
  POSTGRES_PASSWORD: '',
};
=======
    NODE_ENV: '',
    DB_NAME: '',
    DB_USER: '',
    DB_PASSWORD: '',
    DB_HOST: '',
    POSTGRES_HOST: '',
    POSTGRES_DB: '',
    POSTGRES_USER: '',
    POSTGRES_PASSWORD: '',
}
>>>>>>> 7801b11e2576f8cf931e6898567392512888a1d4

populateENV(env, { mode: 'halt' });
