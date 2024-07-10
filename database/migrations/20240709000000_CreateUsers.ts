import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (table: Knex.CreateTableBuilder): void => {
    table.uuid('id').notNullable().primary();
    table.string('firstName', 255).notNullable();
    table.string('middleName', 255).nullable();
    table.string('lastName', 255).notNullable();
    table.enum('role', ['user', 'admin']).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('hash', 255).nullable();
    table.dateTime('modified').notNullable().defaultTo(knex.fn.now());
    table.dateTime('created').notNullable().defaultTo(knex.fn.now());
    table.dateTime('deleted');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
