import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { User } from '@viatim/core/models';
import { IUser } from '@viatim/core/interfaces/user';
import { UsersService } from '@viatim/core/services';

import { AuthService } from '@viatim/auth/auth/auth.service';
import { LocalAuthGuard } from '@viatim/auth/local-auth.guard';
import { Roles } from '@viatim/auth/role.decorator';
import { JwtAuthGuard } from '@viatim/auth/jwt-auth.guard';
import { RolesGuard } from '@viatim/auth/roles.guard';
import { QueryBuilder } from 'objection';
import { EmailService } from '@viatim/email/email/email.service';
import * as process from 'node:process';
import { v4 } from 'uuid';

@Controller('users')
export class UsersController {
  public constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private emailService: EmailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  public login(@Request() req: Request): {
    access_token: string;
    type: string;
  } {
    const user = (req as any).user;
    return this.authService.login(user);
  }

  @Post('register')
  @HttpCode(200)
  public async register(@Body() user: User): Promise<{
    access_token: string;
    type: string;
  }> {
    const existingUser: User = await this.usersService.findByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('Gebruiker bestaat al');
    }

    user.id = v4();
    user.role = 'user';

    return await this.authService.register(user);
  }

  @Post('refresh')
  @HttpCode(200)
  public refresh(@Body() body: { token: string }): Promise<{ access_token: string; type: string }> {
    return this.authService.refresh(body.token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  public list(): QueryBuilder<User, User[]> {
    return this.usersService.findAll().whereNull('deleted');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  public async view(@Param('id') id: string): Promise<IUser> {
    const user: User = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }): Promise<void> {
    console.log('email: ', body);
    const user: User = await this.usersService.resetPassword(body.email);

    await this.emailService.sendMail({
      to: user.email,
      template: 'reset-password',
      subject: 'Wachtwoord resetten',
      context: {
        fullName: user.fullName,
        url: `${process.env.FRONTEND_URL}/users/activation/${user.hash}`,
      },
    });
  }

  @Get('check-hash/:hash')
  public async checkHash(@Param('hash') hash: string): Promise<{ success: boolean }> {
    const user: User = await User.query().where({ hash }).first();

    if (!user) {
      throw new NotFoundException();
    }

    return {
      success: true,
    };
  }

  @Post(':hash/activate')
  @HttpCode(200)
  public activate(@Body() body: { password: string }, @Param('hash') hash: string): Promise<any> {
    return this.usersService.activate(hash, body.password);
  }
}
