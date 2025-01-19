import gql from 'graphql-tag';

export const CommentLikeTyoeDefs = gql`
  type CommentLike {
    _id: ID
    userId: ID!
    commentId: ID!
  }
  input CommentLikeInput {
    commentId: ID!
  }
  type Mutation {
    createCommentLike(input: CommentLikeInput!): CommentLike!
  }
`;
