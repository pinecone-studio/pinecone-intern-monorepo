import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user.schema';
import { PostTypeDefs } from './post.schema';
import { PostLikeTypeDefs } from './post-like.schema';
import { CommentTypeDefs } from './comment.schema';
import { CommentLikeTyoeDefs } from './comment-like.schema';
import { RequestTypeDefs } from './request.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, PostTypeDefs, PostLikeTypeDefs, CommentTypeDefs, CommentLikeTyoeDefs, RequestTypeDefs]);
