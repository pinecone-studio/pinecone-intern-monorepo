import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  enum Gender {
    female
    male
    not_know
  }
  type User {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String!
    password: String!
    hasStory: Boolean
    gender: Gender
    isPrivate: Boolean
    email: String!
    savedUsers: [String]
    followerCount: Int!
    followingCount: Int!
    postCount: Int!
  }
  type UserWithoutPassword {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String
    hasStory: Boolean
    gender: Gender
    isPrivate: Boolean
    email: String!
    followerCount: Int!
    followingCount: Int!
    postCount: Int!
  }
  type FriendshipStatusType {
    followedBy: Boolean
    following: Boolean
    incomingRequest: Boolean
    outgoingRequest: Boolean
  }
  type UserTogetherViewerType {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String!
    hasStory: Boolean
    gender: Gender!
    isPrivate: Boolean!
    email: String!
  }
  type UserTogetherUserType {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String!
    hasStory: Boolean
    gender: Gender
    isPrivate: Boolean
    email: String!
    followingCount: Int!
    followerCount: Int!
    postCount: Int!
    latestStoryTimestamp: Date
    seenStoryTime: Date
    savedUsers: [String]
    createdAt: Date
    friendshipStatus: FriendshipStatusType!
    mutualFollowersCount: Int
    mutualFollowers: String
  }

  type SearchedUsersType {
    savedUsers: [String]!
  }

  type UserTogetherType {
    user: UserTogetherUserType!
    viewer: UserTogetherViewerType!
  }
  type SignInType {
    token: ID!
    exp: Int!
    user: User!
  }

  input UserInput {
    userName: String!
    fullName: String!
    password: String!
    email: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }

  input ProfileInfoInput {
    userName: String!
    fullName: String!
    bio: String!
    gender: Gender!
  }

  type ProfileInfoType {
    userName: String!
    fullName: String!
    bio: String!
    gender: Gender!
  }
  type ProfilePreviewType {
    searchingUserId: ID!
    user: UserTogetherUserType!
    viewer: UserTogetherViewerType!
    firstThreePosts: [PostsEdge!]!
  }
  type Query {
    getUser: UserWithoutPassword
    getUsers: [UserWithoutPassword]
    getUserTogether(searchingUserId: String!): UserTogetherType!
    getUserByName(userName: String!): [UserTogetherUserType!]!
    getSearchedUser: [UserTogetherUserType]!
    getProfilePreview(searchingUserId: ID!): ProfilePreviewType!
    getFollowingSuggestion: [UserTogetherUserType!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateInfo(input: ProfileInfoInput!): ProfileInfoType
    login(input: SignInInput!): SignInType!
    savedSearchUser(searchedUserId: String!): SearchedUsersType
    deleteSearchUser(searchedUserId: String!): SearchedUsersType
  }
`;

// latest_reel_media: 1737434339
// mutual_followers_count: 23
// reel_media_seen_timestamp: 1737434339
