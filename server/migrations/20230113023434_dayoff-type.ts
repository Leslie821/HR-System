import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dayoff_type', (table) => {
    table.increments();
    table.string('dayoff_name');
    table.string('short_form');
    table.string('one_time_dayoff');
    table.string('paid_leave');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dayoff_type');
}
