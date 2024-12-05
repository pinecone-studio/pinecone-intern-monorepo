import gql from 'graphql-tag';

export const typeDefs = gql`
  type SavedPost {
    _id: ID!
    userId: User!
    postId: Posts!
    createdAt: Date!
  }

  type Query {
    getAllSavedPosts(userId: ID!): [SavedPost!]!
    getSavedByPostId(postId: ID!): SavedPost!
  }
  type Mutation {
    createSave(postId: ID!, userId: ID!): Response!
  }
`;
