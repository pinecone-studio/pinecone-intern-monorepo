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

  input AddComment {
    comment: String!
    userId: ID!
    postId: ID!
  }

  type Mutation {
    createComment(input: AddComment!): Comments!
  }
`;
