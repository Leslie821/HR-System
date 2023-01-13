import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('leave_balance', (table) => {
    table.increments();
    table.string('name');
    table.integer('remain');
    table.integer('fixed_amount');
    table.string('employee_type');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('leave_balance');
}
