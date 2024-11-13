import gql from 'graphql-tag';

export const typeDefs = gql`
  type Posts {
    _id: ID!
    userId: ID!
    images: [String!]!
    caption: String!
    likeCounts: Int!
    createdAt: Date!
    updatedAt: Date!
  }
  input CreatePostInput {
    userId: ID!
    images: [String!]!
    caption: String!
  }
  type Query {
    getAllPosts: [Posts!]!
  }
  type Mutation {
    createPost(input: CreatePostInput!): Posts!
  }
`;
