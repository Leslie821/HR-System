import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable("department", (table) => {
        table.increments();
        table.string("department_name", 255);
    })

    await knex.schema.createTable("job_title", (table) => {
        table.increments();
        table.string("job_title", 255);
        table.integer("department_id").references('department.id')
    })

    await knex.schema.createTable("department_relation", (table) => {
        table.increments();
        table.integer("father_department_id").references('department.id');
        table.integer("child_department_id").references('department.id')
    })

    await knex.schema.createTable("access_level", (table) => {
        table.increments();
        table.integer("level");
    })

    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.timestamp('birthday');
        table.timestamp('employ_date');
        table.timestamp('termination_date');
        table.timestamp('working_time');
        table.string('gender', 50);
        table.string('email', 255);
        table.string('address', 255);
        table.string('name', 255);
        table.string('job_nature', 255);
        table.string('contract', 255);
        table.string('mpf', 255);
        table.string('username', 255);
        table.string('password', 255);
        table.integer('salary');
        table.integer('annual_leave_fixed');
        table.integer('sick_leave_fixed');
        table.integer('bank_account');
        table.integer('phone');
        table.integer('access_level').references('access_level.id');
        table.integer('job_title').references('job_title.id');
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('department');
    await knex.schema.dropTable('job_title');
    await knex.schema.dropTable('department_relation');
    await knex.schema.dropTable('access_level');
    await knex.schema.dropTable('staff_table');
}

