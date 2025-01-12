import gql from 'graphql-tag';

export const StoryTypeDefs = gql`
  type Story {
    _id: ID
    storyImage: String
    userId: ID
    expiringAt: Date
    duration: String
  }

  input StoryInput {
    storyImage: String
    userId: ID
    expiringAt: Date
    duration: String
  }

  type Mutation {
    createStory(input: StoryInput!): Story!
  }
`;
