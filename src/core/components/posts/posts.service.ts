import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'objection';
import { Post } from '@viatim/core/models/post';
import { IPost } from '@viatim/core/interfaces/post';

@Injectable()
export class PostsService {
  public constructor() {}

  public findAll(): QueryBuilder<Post, Post[]> {
    return Post.query().where({ deleted: null }).withGraphFetched('user');
  }

  public findById(id: string): QueryBuilder<Post, Post> {
    return Post.query().where({ deleted: null }).findById(id).withGraphFetched('user');
  }

  public findByUserId(userId: string): QueryBuilder<Post, Post[]> {
    return Post.query().where({ deleted: null }).where({ userId });
  }

  public upsert(data: IPost): QueryBuilder<Post, Post> {
    return Post.query()
      .upsertGraphAndFetch(data, {
        insertMissing: true,
      })
      .withGraphFetched('user');
  }

  public deleteById(id: string): QueryBuilder<Post, number> {
    return this.findById(id).patch({
      deleted: new Date(),
    });
  }
}
