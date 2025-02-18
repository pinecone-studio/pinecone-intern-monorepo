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
  }
  type OneStoryType {
    _id: ID!
    storyImage: String!
    userId: ID!
    expiringAt: Date!
    duration: Int!
    user: UserTogetherUserType!
    storyLiked: Boolean!
    createdAt: Date!
  }
  type OneUserStoriesType {
    _id: ID!
    userId: ID!
    latestStoryId: ID!
    latestStoryTimestamp: Date!
    seenStoryTime: Date!
    items: [OneStoryType!]!
    user: UserTogetherUserType!
  }
  type PreviewAllStoriesType {
    storyTray: [OneUserStoriesType!]!
    viewer: UserTogetherViewerType!
  }
  type Query {
    getPreviewAllStories: PreviewAllStoriesType!
    getOneStory(targetUserId: ID!): [OneUserStoriesType!]!
  }
  type Mutation {
    createStory(input: StoryInput!): Story!
  }
`;
