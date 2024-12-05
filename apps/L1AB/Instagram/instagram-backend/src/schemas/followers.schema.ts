import gql from 'graphql-tag';

export const typeDefs = gql`
  type Follower {
    _id: ID!
    email: String!
    username: String!
    fullname: String!
    gender: String!
    profilePicture: String!
    bio: String!
    isPrivate: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }
  type Followers {
    _id: ID!
    followerId: ID!
    followeeId: ID!
    createdAt: Date!
  }
  type CreateFollowerMessage {
    message: String!
  }

  type Query {
    getFollowersById(_id: ID!): [Follower!]!
    getFollowingById(_id: ID!): [Follower!]!
  }

  type Mutation {
    deleteFollower(followerId: ID!, followeeId: ID!): Followers!
    createFollowers(followerId: ID!, followeeId: ID!): CreateFollowerMessage!
  }
`;
