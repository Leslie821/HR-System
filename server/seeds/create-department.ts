import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("department").del();
    await knex("job_title").del();
    await knex("access_level").del();

    // Inserts seed entries
    await knex("department").insert([
        { id: 1, name: 'Boss', },
        { id: 2, name: 'HR', father_department_id: 1 },
        { id: 3, name: 'MK', father_department_id: 1 },
        { id: 4, name: 'IT', father_department_id: 1 }
    ]);

    await knex("job_title").insert([
        { id: 1, type: 'CEO', department_id: 1 },
        { id: 2, type: 'HR Manager', department_id: 2 },
        { id: 3, type: 'MK Manager', department_id: 3 },
        { id: 4, type: 'IT Manager', department_id: 4 }
    ]);

    await knex("access_level").insert([
        { id: 1, level: 'Admin', },
        { id: 2, level: 'Manager', },
        { id: 3, level: 'Staff', },
    ]);
};
