import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        const optionalAuth = this.reflector.get<boolean>('optionalAuth', context.getHandler());
        return optionalAuth === true;
      }

      throw e;
    }
  }
}
