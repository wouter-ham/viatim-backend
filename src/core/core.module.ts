import { Global, Module } from '@nestjs/common';

import * as Services from './services';

const services = [Services.UsersService];

@Global()
@Module({
  exports: services,
  providers: services,
})
export class CoreModule {}
