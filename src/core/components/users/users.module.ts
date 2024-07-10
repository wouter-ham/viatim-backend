import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from '@viatim/core/components/users/users.controller';
import { AuthModule } from '@viatim/core/components/auth/auth.module';
import { UsersService } from '@viatim/core/components/users/users.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
