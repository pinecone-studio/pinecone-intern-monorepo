import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type RegisterUserResponse {
    user: User!
    sessionToken: String!
  }

  input RegisterUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserResponse!
  }
`;
