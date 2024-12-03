import gql from 'graphql-tag';

export const typeDefs = gql`
  type SavedPost {
    _id: ID!
    userId: ID!
    postId: ID!
    createdAt: Date!
  }

  type Query {
    getAllSavedPosts: [SavedPost!]!
    getSavedByPostId(postId: ID!): [SavedPost!]!
  }
  type Mutation {
    createSave(postId: ID!, userId: ID!): Response!
  }
`;
