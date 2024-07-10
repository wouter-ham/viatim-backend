// @ts-ignore
import { Knex } from 'knex';
import { data } from '../seed-data/users';

export async function seed(knex: Knex): Promise<any> {
  await knex('users').del();
  return knex('users').insert(data);
}
