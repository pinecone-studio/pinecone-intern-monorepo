import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    profilePicture: String!
    role: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    createUser(username: String!, email: String!, password: String!, profilePicture: String!): User!
  }
`;
