import gql from 'graphql-tag';

export const StoryViewTypeDefs = gql`
  type StoryView {
    _id: ID
    userId: ID
    storyNodeId: ID
    latestStory: ID
    seen: Date
  }

  input StoryViewInput {
    storyNodeId: ID
    latestStory: ID
    seen: Date
  }

  type Mutation {
    createStoryView(input: StoryViewInput!): StoryView!
  }
`;
