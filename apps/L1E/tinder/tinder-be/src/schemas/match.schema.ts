import gql from 'graphql-tag';

export const typeDefs = gql`
  type Match {
    _id: ID!
    userId: String!
    targetUserId: String!
    stillmatch: Boolean!
    createdAt: String!
  }

  type Mutation {
    matchUsersCreate(input: MatchUsersCreateInput!): Match!
  }

  type Query {
    getMatchedUserById(_id: ID!): Match!
  }

  input MatchUsersCreateInput {
    userId: String!
    targetUserId: String!
    stillmatch: Boolean!
  }
`;
