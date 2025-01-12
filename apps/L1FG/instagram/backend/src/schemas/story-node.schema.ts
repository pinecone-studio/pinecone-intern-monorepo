import gql from 'graphql-tag';

export const StoryNodeTypeDefs = gql`
  type StoryNode {
    _id: ID
    userId: ID!
    stories: [ID]
  }

  input StoryNodeInput {
    userId: ID
    stories: [ID]
  }
`;
