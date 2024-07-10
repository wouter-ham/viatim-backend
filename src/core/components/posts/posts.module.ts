import { Module } from '@nestjs/common';
import { PostsController } from '@viatim/core/components/posts/posts.controller';
import { PostsService } from '@viatim/core/components/posts/posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
