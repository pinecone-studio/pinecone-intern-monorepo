import gql from 'graphql-tag';

export const StoryViewTypeDefs = gql`
  type StoryView {
    _id: ID!
    ownerId: ID!
    viewerId: ID!
    seen: Date!
  }

  input StoryViewInput {
    ownerId: ID!
    seen: Date!
  }

  type Mutation {
    updateStoryView(input: StoryViewInput!): StoryView!
  }
`;
