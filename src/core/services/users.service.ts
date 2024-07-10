import { genSaltSync, hashSync } from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@viatim/core/models';
import { IUser } from '@viatim/core/interfaces';
import { v4 } from 'uuid';
import { QueryBuilder } from 'objection';

@Injectable()
export class UsersService {
  public constructor() {}

  public findAll(): QueryBuilder<User, User[]> {
    return User.query().orderBy('firstName', 'ASC').orderBy('middleName', 'ASC').orderBy('lastName', 'ASC');
  }

  public findByEmail(email: string): QueryBuilder<User, User> {
    console.log('email');
    console.log(email);
    return User.query().where({ email }).first();
  }

  public findById(id: string): QueryBuilder<User, User> {
    return User.query().findById(id);
  }

  public upsert(data: IUser): QueryBuilder<User, User> {
    return User.query().upsertGraphAndFetch(data, {
      insertMissing: true,
    });
  }

  public async activate(hash: string, password: string): Promise<IUser> {
    const user: User = await User.query().where({ hash }).first();

    if (!user) {
      throw new BadRequestException();
    }

    return User.query().patchAndFetchById(user.id, {
      hash: null,
      password: hashSync(password, genSaltSync(8)),
    });
  }

  public deleteById(id: string): QueryBuilder<User, number> {
    return this.findById(id).patch({
      deleted: new Date(),
    });
  }

  public async deleteUser(user: User): Promise<number> {
    if (!user) {
      throw new NotFoundException();
    }

    return this.deleteById(user.id).execute();
  }

  public async upsertUser(user: User): Promise<User> {
    const existingUser: User = await this.findById(user.id);
    const isNew: boolean = !existingUser;
    user = User.fromJson(isNew ? { ...existingUser, ...user } : user);

    // Generate a random password and hash for new users
    if (isNew) {
      user.password = hashSync(v4(), genSaltSync(8));
      user.hash = v4();
    }

    return this.upsert(user);
  }

  public async resetPassword(email: string): Promise<User> {
    const user: User = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    user.hash = v4();
    return this.upsert(user);
  }
}
