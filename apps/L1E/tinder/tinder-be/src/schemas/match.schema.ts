import gql from 'graphql-tag';

export const typeDefs = gql`
  type Match {
    _id: ID!
    userId: User!
    targetUserId: User!
    stillmatch: Boolean!
    createdAt: String!
  }

  type Mutation {
    matchUsersCreate(input: MatchUsersCreateInput!): Match!
  }

  type Query {
    getMatchedUsers(authId: String!): [Match!]!
  }

  input MatchUsersCreateInput {
    userId: String!
    targetUserId: String!
    stillmatch: Boolean!
  }
`;
