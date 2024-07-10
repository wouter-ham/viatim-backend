import { EmailService } from './email/email.service';
import { EmailModuleOptions } from './email-module.options';
import { DynamicModule } from '@nestjs/common';

export class EmailModule {
  static register(config: EmailModuleOptions): DynamicModule {
    return {
      global: config.global === true,
      module: EmailModule,
      providers: [
        EmailService,
        {
          provide: EmailModuleOptions,
          useValue: config,
        },
      ],
      exports: [EmailService, EmailModuleOptions],
    };
  }
}
