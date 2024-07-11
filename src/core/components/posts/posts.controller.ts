import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post as PostRequest,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '@viatim/core/components/posts/posts.service';
import { Post } from '@viatim/core/models/post';
import { JwtAuthGuard, Roles, RolesGuard } from '@viatim/core/components/auth';
import { IPost } from '@viatim/core/interfaces/post';
import { User } from '@viatim/core/models';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  public constructor(private postService: PostsService) {}

  @Roles('user', 'admin')
  @Get()
  public async getAllPosts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Roles('user', 'admin')
  @Get('user/:userId')
  public async findByUserId(@Param('userId') userId: string): Promise<Post[]> {
    return this.postService.findByUserId(userId);
  }

  @Roles('user', 'admin')
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<Post> {
    return this.postService.findById(id);
  }

  @Roles('user', 'admin')
  @PostRequest(':id')
  public async create(@Req() req: any, @Param('id') id: string, @Body() post: IPost): Promise<Post> {
    const user: User = req.user;
    post.id ??= id;
    post.userId = user.id;

    return this.postService.upsert(post);
  }

  @Roles('user', 'admin')
  @Put(':id')
  public async update(@Req() req: any, @Param('id') id: string, @Body() body: IPost): Promise<Post> {
    const post: Post = await this.postService.findById(id);
    const user: User = req.user;

    if (user.id !== post.userId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.postService.upsert(body);
  }

  @Roles('user', 'admin')
  @Delete(':id')
  public async delete(@Req() req: any, @Param('id') id: string): Promise<{ success: boolean }> {
    const post: Post = await this.postService.findById(id);
    const user: User = req.user;

    if (user.id !== post.userId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    await this.postService.deleteById(id);

    return { success: true };
  }
}
