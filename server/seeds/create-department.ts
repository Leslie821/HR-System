import { hashPassword } from '../hash';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('access_level').del();
  await knex('job_title').del();
  await knex('department').del();

  // Inserts seed entries
  await knex('department').insert([
    { id: 1, department_name: 'Boss' },
    { id: 2, department_name: 'HR', father_department_id: 1 },
    { id: 3, department_name: 'MK', father_department_id: 1 },
    { id: 4, department_name: 'IT', father_department_id: 1 },
  ]);

  await knex('job_title').insert([
    { id: 1, job_title_type: 'Boss', department_id: 1 },
    { id: 2, job_title_type: 'HR Manager', department_id: 2 },
    { id: 3, job_title_type: 'MK Manager', department_id: 3 },
    { id: 4, job_title_type: 'IT Manager', department_id: 4 },
  ]);

  await knex('access_level').insert([
    { id: 1, access_level_type: 'Admin' },
    { id: 2, access_level_type: 'Manager' },
    { id: 3, access_level_type: 'Staff' },
  ]);
  await knex('users').insert([
    {
      id: 1,
      gender: '女',
      name: '三上悠亞',
      email: 'yua_mikami@gmail.com',
      address: 'フクオカケン, キタキュウシュウシトバタク, トバタ, 226-1162',
      job_nature: 'av女優',
      password: await hashPassword('!TEK-067'),
      birthday: '1993-08-16',
      employ_date: '2009-03-01',
      working_time: '0900-1200',
      salary: 1000000,
      annual_leave_fixed: 365,
      sick_leave_fixed: 200,
      bank_account: '84-58-88',
      phone: 12345678,
      access_level_id: 1,
      job_title_id: 1,
      department_id: 1,
    },
  ]);
}
