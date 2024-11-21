import gql from 'graphql-tag';

export const typeDefs = gql`
  type Comments {
    _id: ID!
    userId: User
    postId: Posts
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
    deleteComment(_id: ID!): Response!
  }

  type Query {
    getCommentsByPostId(postId: ID!): [Comments!]!
  }
`;
