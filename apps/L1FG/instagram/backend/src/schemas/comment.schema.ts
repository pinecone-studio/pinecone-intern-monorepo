import gql from 'graphql-tag';

export const CommentTypeDefs = gql`
  type Comment {
    _id: ID
    comment: String
    userId: ID
    postId: ID
    createdAt: Date
    updatedAt: Date
  }
  input CommentInput {
    comment: String!
    postId: ID!
  }
  type Mutation {
    createComment(input: CommentInput!): Comment!
  }
`;
