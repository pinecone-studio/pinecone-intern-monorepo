import { gql } from 'apollo-server-cloud-functions';

export const userTypeDefs = gql`
  type User {
    userId: ID!
    username: String!
    email: String!
    profile: String
    password: String!
    bonusPoints: Int
    role: String!
    createdAt: String
    updatedAt: String
  }

  input GetUserInput {
    userId: ID!
  }

  type Query {
    getUser(input: GetUserInput!): User!
    getUsers: [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(input: DeleteUserInput!): User!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    userId: ID!
    username: String
    email: String
    password: String
    profile: String
  }

  input DeleteUserInput {
    userId: ID!
  }
`;
