import { Model } from 'objection';
import { IUser } from '../interfaces/user';

export class User extends Model implements IUser {
  static tableName = 'users';

  static relationMappings = {};

  public id: string;

  public firstName: string;

  public middleName: string;

  public lastName: string;

  public role: 'user' | 'admin';

  public email: string;

  public password: string;

  public hash: string | null;

  public deleted?: Date;

  public get fullName(): string {
    return this.middleName
      ? `${this.firstName} ${this.middleName} ${this.lastName}`
      : `${this.firstName} ${this.lastName}`;
  }

  $formatJson(json: any) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}
