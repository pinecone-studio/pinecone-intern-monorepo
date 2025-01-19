import gql from 'graphql-tag';

export const StoryTypeDefs = gql`
  type Story {
    _id: ID
    storyImage: String
    userId: ID
    expiringAt: Date
    duration: Int
  }

  input StoryInput {
    storyImage: String
    expiringAt: Date
    duration: Int
  }

  type Mutation {
    createStory(input: StoryInput!): Story!
  }
`;
