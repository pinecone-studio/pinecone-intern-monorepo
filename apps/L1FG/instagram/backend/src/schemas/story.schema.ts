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

  type Mutation {
    createStory(input: StoryInput!): Story!
  }
`;
//  type OneStoryType {
//     _id: ID
//     storyImage: String
//     userId: ID
//     expiringAt: Date
//     duration: Int
//     user: UserTogetherUserType
//     storyHasLiked: Boolean
//   }
//   type OneUserStoriesType {
//     latestStoryTimestamp: Date
//     seenStoryTime: Date
//     items: [OneStoryType]
//   }
//   type Query {
//     getStories: [OneUserStoriesType]
//   }
