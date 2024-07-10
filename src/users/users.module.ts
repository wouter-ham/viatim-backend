import { Module } from '@nestjs/common';
import { SharedModule } from '@viatim/shared/shared.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
})
export class UsersModule {}
