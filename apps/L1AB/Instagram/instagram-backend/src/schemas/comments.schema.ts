import gql from 'graphql-tag';

export const typeDefs = gql`
  type Comments {
    _id: ID!
    userId: ID!
    postId: ID!
    comment: String!
    updatedAt: Date!
    createdAt: Date!
  }

  input AddCommentInput {
    comment: String!
    userId: ID!
    postId: ID!
  }

  input UpdateCommentInput {
    comment: String!
    userId: ID!
    postId: ID!
  }

  type Mutation {
    createComment(input: AddCommentInput!): Comments!
    updateComment(input: UpdateCommentInput!, _id: ID!): Comments!
  }
`;
