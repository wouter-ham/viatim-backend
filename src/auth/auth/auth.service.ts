import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { IUser } from '@viatim/core/interfaces';
import { UsersService } from '@viatim/core/services';
import { User } from '@viatim/core/models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<IUser> {
    const user: User = (await this.usersService.findByEmail(email).whereNull('deleted')) as User;

    if (!user) {
      return;
    }

    const isValidPassword: boolean = compareSync(password, user.password);

    if (!isValidPassword) {
      return;
    }

    return user;
  }

  public sign(payload: any, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  public login(user: IUser): { access_token: string; type: string } {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      role: user.role,
      sub: user.id,
    };

    return {
      access_token: this.sign(payload),
      type: 'bearer',
    };
  }

  public async register(data: IUser): Promise<{ access_token: string; type: string }> {
    const user: User = await User.query().upsertGraphAndFetch(data, { insertMissing: true });

    return this.login(user);
  }

  public async refresh(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { ignoreExpiration: true });
      const user: User = await this.usersService.findById(decoded.sub);

      if (!user) {
        throw new BadRequestException();
      }

      return this.login(user);
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }
}
