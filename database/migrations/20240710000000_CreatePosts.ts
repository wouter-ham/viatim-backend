import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('posts', (table: Knex.CreateTableBuilder): void => {
    table.uuid('id').notNullable().primary();
    table.uuid('userId').notNullable();
    table.string('title', 255).notNullable();
    table.text('content', 'longtext').notNullable();

    table.dateTime('created').notNullable().defaultTo(knex.fn.now());
    table.dateTime('modified').notNullable().defaultTo(knex.fn.now());
    table.dateTime('deleted');

    table.foreign('userId').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('posts');
}
