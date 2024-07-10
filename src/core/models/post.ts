import { Model } from 'objection';
import { IPost } from '@viatim/core/interfaces/post';
import path from 'path';

export class Post extends Model implements IPost {
  static tableName = 'posts';

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'user'),
      join: {
        from: 'posts.userId',
        to: 'users.id',
      },
    },
  };

  public id: string;

  public userId: string;

  public title: string;

  public content: string;

  public created: Date;
  public updated: Date;
  public deleted?: Date;
}
