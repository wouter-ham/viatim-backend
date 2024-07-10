import { DynamicModule, Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Global()
@Module({})
export class AuthModule {
  static register(config: JwtModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [UsersModule, PassportModule, JwtModule.register(config)],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [AuthService],
    };
  }
}
