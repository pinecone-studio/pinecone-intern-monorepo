import gql from 'graphql-tag';

export const typeDefs = gql`
  type Story {
    _id: ID!
    userId: User!
    image: String!
    views: [User!]!
    createdAt: Date!
  }
  input CreateStoryInput {
    userId: ID!
    image: String!
  }
  type Query {
    getAllStories: [Story!]!
  }

  type Mutation {
    createStory(input: CreateStoryInput!): Story!
    deleteStory(_id: ID!): Response!
  }
`;
