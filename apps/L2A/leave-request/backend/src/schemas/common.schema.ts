import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    profilePicture: String!
    role: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input UserInput {
    username: String!
    email: String!
    profilePicture: String!
  }

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
    createUser(userArgs: UserInput): User!
  }
`;
