import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as CommentsTypeDefs } from './comments.schema';
import { typeDefs as FollowersTypeDefs } from './followers.schema';
import { typeDefs as LikesTypeDefs } from './likes.schema';
import { typeDefs as NotificationsTypeDefs } from './notifications.schema';
import { typeDefs as PostsTypeDefs } from './posts.schema';
import { typeDefs as UserTypeDefs } from './user-schema';
import { typeDefs as StoryTypeDefs } from './story.schema';
import { typeDefs as SavedPostTypeDefs } from './saved.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, CommentsTypeDefs, FollowersTypeDefs, LikesTypeDefs, NotificationsTypeDefs, PostsTypeDefs, UserTypeDefs, StoryTypeDefs, SavedPostTypeDefs]);
