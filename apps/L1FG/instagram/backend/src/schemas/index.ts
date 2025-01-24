import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user.schema';
import { PostLikeTypeDefs } from './post-like.schema';
import { CommentTypeDefs } from './comment.schema';
import { CommentLikeTyoeDefs } from './comment-like.schema';
import { RequestTypeDefs } from './request.schema';
import { FollowerTypeDefs } from './followers.schema';
import { StoryNodeTypeDefs } from './story-node.schema';
import { StoryTypeDefs } from './story.schema';
import { StoryLikeTypeDefs } from './story-like.schema';
import { StoryViewTypeDefs } from './story-view.schema';
import { PostTypeDefs } from './post.schema';


export const typeDefs = mergeTypeDefs([
  CommonTypeDefs,
  UserTypeDefs,
  PostTypeDefs,
  PostLikeTypeDefs,
  CommentTypeDefs,
  CommentLikeTyoeDefs,
  RequestTypeDefs,
  FollowerTypeDefs,
  StoryNodeTypeDefs,
  StoryTypeDefs,
  StoryLikeTypeDefs,
  StoryViewTypeDefs,
]);

