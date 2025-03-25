import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input RegisterUserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type RegisterUserResponse {
    user: User!
    sessionToken: String!
  }

  type LoginUserResponse {
    user: User!
    sessionToken: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserResponse!
    loginUser(input: LoginInput!): LoginUserResponse!
  }

  type Query {
    getUser(userId: ID!): User!
  }
`;
