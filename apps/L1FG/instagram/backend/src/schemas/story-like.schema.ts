import gql from 'graphql-tag';

export const StoryLikeTypeDefs = gql`
  type StoryLike {
    _id: ID
    userId: ID!
    storyId: ID!
    createdAt: Date
  }

  input StoryLikeInput {
    storyId: ID!
  }

  type Mutation {
    createStoryLike(input: StoryLikeInput!): StoryLike!
  }
`;
