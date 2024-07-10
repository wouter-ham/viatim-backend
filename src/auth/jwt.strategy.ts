import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtTokenDto } from '@viatim/auth/jwt-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
    });
  }

  public validate(payload: Record<string, unknown>): JwtTokenDto {
    return <JwtTokenDto>{ id: payload.sub, email: payload.email, role: payload.role };
  }
}
