import gql from 'graphql-tag';

export const StoryViewTypeDefs = gql`
  type StoryView {
    _id: ID
    userId: ID
    storyNodeId: ID
    latestStory: Date
    seen: Date
  }

  input StoryNodeInput {
    userId: ID
    storyNodeId: ID
    latestStory: Date
    seen: Date
  }
`;
