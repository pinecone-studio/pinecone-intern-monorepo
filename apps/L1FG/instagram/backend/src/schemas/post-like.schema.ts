/*eslint-disable*/
import gql from 'graphql-tag';
export const PostLikeTypeDefs = gql`
  type PostLike {
    _id: ID!
    userId: ID!
    postId: ID!
  }
  type PostlikeWithNotificationIdType {
    _id: ID!
    userId: ID!
    postId: ID!
    notificationId: ID!
  }
  input PostLikeWithNotificationIdInput {
    postLikeid: ID!
    postId: ID!
    notificationId: ID!
  }
  input PostLikeInput {
    postId: ID!
    ownerUserId: ID!
  }
  type Mutation {
    createPostLike(input: PostLikeInput!): PostlikeWithNotificationIdType!
    deletePostLike(input: PostLikeWithNotificationIdInput!): PostLike
  }
`;
