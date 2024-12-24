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
    getAllStories(followerId: ID!): [Story!]!
  }

  input DeleteStoryInput {
    _id: ID!
    userId: ID!
  }

  type Mutation {
    createStory(input: CreateStoryInput!): Response!
    deleteStory(input: DeleteStoryInput!): Response!
  }
`;
