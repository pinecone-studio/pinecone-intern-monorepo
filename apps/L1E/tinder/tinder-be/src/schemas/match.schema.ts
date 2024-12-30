import gql from 'graphql-tag';

export const typeDefs = gql`
  type Mutation {
    matchUsersCreate(input: MatchUsersCreateInput!): Match!
  }

  input MatchUsersCreateInput {
    userId: String!
    targetUserId: String!
    stillmatch: Boolean!
  }

  type Match {
    _id: ID!
    userId: String!
    targetUserId: String!
    stillmatch: Boolean!
    createdAt: String!
  }
`;
