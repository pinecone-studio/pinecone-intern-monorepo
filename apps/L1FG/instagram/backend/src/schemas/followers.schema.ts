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
    friendshipStatus: FriendshipStatusType!
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
  input SmallFollowInput {
    after: ID
    first: Int!
    searchingUserId: ID!
  }
  type PageInfo {
    startCursor: ID!
    endCursor: ID!
    hasNextPage: Boolean!
  }
  type FollowedRequested {
    isFollowed: Boolean
    isRequested: Boolean
  }
  type FollowersEdge {
    cursor: ID!
    node: FollowerType!
  }
  type FollowersConnection {
    edges: [FollowersEdge!]!
    pageInfo: PageInfo!
  }
  type FollowingsEdge {
    cursor: ID!
    node: FollowingType!
  }
  type FollowingsConnection {
    edges: [FollowingsEdge!]!
    pageInfo: PageInfo!
  }
  type Query {
    getFollowers(input: SmallFollowInput!): FollowersConnection!
    getFollowings(input: SmallFollowInput!): FollowingsConnection!
    searchFollowings(userName: String!): FollowingsConnection!
    searchFollowers(userName: String!): FollowersConnection!
  }
  type Mutation {
    createFollower(input: FollowInput!): FollowedRequested!
    acceptRequest(followerId: String!): FollowedRequested!
    unfollow(followerId: String!): Follow
    deleteFollower(followerId: ID!): FollowedRequested!
    deleteRequest(targetId: String!): FollowedRequested
  }
`;
