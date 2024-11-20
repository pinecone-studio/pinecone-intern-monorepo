import gql from 'graphql-tag';

export const typeDefs = gql`
  type Story {
    _id: ID!
    userId: User!
    image: String!

    createdAt: Date!
  }
  input CreateStoryInput {
    userId: ID!
    image: String!
  }
  type Query {
    getAllStories: [[Story]]
    getStoriesByUserId(userId: ID!): [Story!]!
  }

  type Mutation {
    createStory(input: CreateStoryInput!): Response!
    deleteStory(_id: ID!): Response!
  }
`;
