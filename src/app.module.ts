import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { EmailModule } from './email/email.module';
import dotenv from 'dotenv';
import { ObjectionModule } from '@viatim/objection/objection.module';

dotenv.config();

@Module({
  imports: [
    CoreModule,
    EmailModule.register({
      global: true,
      host: process.env.EMAIL_HOST,
      secure: process.env.EMAIL_SECURE === 'true',
      port: +process.env.EMAIL_PORT,
      email: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      backendUrl: process.env.BACKEND_URL,
      frontendUrl: process.env.FRONTEND_URL,
      fromAddress: process.env.EMAIL_FROM_ADDRESS,
      fromName: process.env.EMAIL_FROM_NAME,
      replyTo: process.env.EMAIL_REPLY_TO,
    }),
    AuthModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    ObjectionModule.register({
      debug: false,
      connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
        socketPath: process.env.DATABASE_SOCKET_PATH,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        timezone: process.env.TZ,
        connectTimeout: 60000,
      },
    }),
    UsersModule,
    SharedModule,
    CoreModule,
  ],
})
export class AppModule {}
