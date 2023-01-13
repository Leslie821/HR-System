import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('leave_status', (table) => {
    table.increments();
    table.integer('staffid');
    table.string('name');
    table.string('dayoff_type');
    table.timestamp('from');
    table.timestamp('to');
    table.integer('day_length');
    table.string('approved_by');
    table.string('status');
    table.string('reason');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('leave_status');
}
