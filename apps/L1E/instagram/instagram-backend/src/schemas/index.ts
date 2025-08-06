import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './user.schema';
import { typeDefs as PostTypeDefs } from './post.schema';
import { typeDefs as LikeTypeDefs } from './like.schema';
import { typeDefs as CommentTypeDefs } from './comment.schema';
import { typeDefs as ReceivedRequestTypeDefs } from './received-request.schema';

export const typeDefs = mergeTypeDefs([
    CommonTypeDefs,
    UserTypeDefs,
    PostTypeDefs,
    LikeTypeDefs,
    CommentTypeDefs,
    ReceivedRequestTypeDefs
]);
