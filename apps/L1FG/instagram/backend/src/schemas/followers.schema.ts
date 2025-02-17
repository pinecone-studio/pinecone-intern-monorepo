import gql from 'graphql-tag';

export const FollowerTypeDefs = gql`
  type Follow {
    _id: ID
    followerId: ID!
    targetId: ID!
  }
  type FriendshipStatusType {
    followedBy: Boolean!
    following: Boolean!
    incomingRequest: Boolean!
    outgoingRequest: Boolean!
  }
  type FollowerUserType {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String!
    hasStory: Boolean
    gender: Gender!
    isPrivate: Boolean!
    email: String!
    friendshipStatus: FriendshipStatusType
  }
  type FollowingUserType {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String!
    hasStory: Boolean
    gender: Gender
    isPrivate: Boolean!
    email: String!
    friendshipStatus: FriendshipStatusType
  }
  type FollowerType {
    followerId: ID!
    targetId: ID!
    user: UserTogetherUserType!
  }
  type FollowingType {
    followerId: ID!
    targetId: ID!
    user: UserTogetherUserType!
  }
  input FollowInput {
    targetId: ID!
  }
  type FollowedRequested {
    isFollowed: Boolean
    isRequested: Boolean
  }
  type Query {
    getFollowers(searchingUserId: ID): [FollowerType!]!
    getFollowing(searchingUserId: ID): [FollowingType!]!
  }
  type Mutation {
    createFollower(input: FollowInput!): FollowedRequested!
    acceptRequest(followerId: String!): FollowedRequested!
    unfollow(followerId: String!): Follow
  }
`;
