import { Model } from 'objection';
import knex, { Knex } from 'knex';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class ObjectionModule {
  static register(config: Knex.Config): DynamicModule {
    const knexConfig: knex.Knex.Config = {
      ...config,
      client: 'postgres',
      connection: {
        ...(config.connection as any),
        typeCast: (field: any, next: any) => {
          if (field.type === 'TINY' && field.length === 1) {
            return field.string() === '1';
          }
          return next();
        },
      },
    };

    const providers = [
      {
        provide: 'KnexConnection',
        useFactory: async () => {
          const knexCon = knex(knexConfig);
          Model.knex(knexCon);
          return knexCon;
        },
      },
    ];

    return {
      module: ObjectionModule,
      providers: providers,
      exports: providers,
    };
  }
}
