import gql from 'graphql-tag';

export const CommentLikeTyoeDefs = gql`
  type CommentLike {
    _id: ID
    userId: ID!
    commentId: ID!
  }
  input CommentLikeInput {
    commentId: ID!
    postId: ID!
    ownerUserId: ID!
  }
  type CommentType {
    _id: ID!
    userId: ID!
    commentId: ID!
    user: UserTogetherUserType!
  }
  type Query {
    getCommentLikedPeople(commentId: ID!): [CommentType!]!
  }
  type Mutation {
    createCommentLike(input: CommentLikeInput!): CommentLike!
    deleteCommentLike(input: CommentLikeInput!): CommentLike!
  }
`;
