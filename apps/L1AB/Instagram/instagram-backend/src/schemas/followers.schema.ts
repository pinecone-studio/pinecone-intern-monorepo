import gql from 'graphql-tag';

export const typeDefs = gql`
  type Followers {
    _id: ID!
    followerId: ID!
    followeeId: ID!
    createdAt: Date!
  }

  type Query {
    getFollowersById(_id: ID!): [Followers!]!
    getFollowingById(_id: ID!): [Followers!]!
  }

  type Mutation {
    deleteFollower(followerId: ID!, followeeId: ID!): Followers!
    createFollowers(followerId: ID!, followeeId: ID!): Followers!
  }
`;
