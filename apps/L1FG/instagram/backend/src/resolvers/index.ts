import { GraphQLScalarType, Kind } from 'graphql';
import * as Mutation from './mutations';
import * as Query from './queries';
import * as FollowerUserType from './follow/follower-user-type';
import * as FollowingUserType from './follow/following-user-type';
import * as UserTogetherUserType from './user/user-together-user-type';
import * as UserPostType from './post/user-post-type';
import * as CommentDetailType from './comment/comment-detail-type';
import * as NotificationType from './notification/notification-type';
import * as FollowerType from './follow/follower-type';
import * as FollowingType from './follow/following-type';
import * as OneUserStoriesType from './story/one-user-stories-type';
import * as OneStoryType from './story/one-story-type';
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value == 0) {
      return 0;
    }
    if (value instanceof Date) {
      return value.getTime();
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value);
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});
export const resolvers = {
  Date: dateScalar,
  Mutation,
  Query,
  FollowerUserType,
  FollowingUserType,
  UserTogetherUserType,
  UserPostType,
  CommentDetailType,
  NotificationType,
  FollowerType,
  FollowingType,
  OneUserStoriesType,
  OneStoryType,
};
