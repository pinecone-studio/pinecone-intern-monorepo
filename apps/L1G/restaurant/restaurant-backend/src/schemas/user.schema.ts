import { gql } from 'apollo-server-cloud-functions';

export const userTypeDefs = gql`
  type User {
    userId: ID!
    email: String!
    username: String!
    profile: String
    password: String!
    bonusPoints: Int
    role: String!
    phoneNumber: String
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
    updateUser(userId: ID!, input: UpdateUserInput!): User!
    deleteUser(userId: ID!): User!
  }

  input CreateUserInput {
    email: String!
    password: String!
    username: String!
  }

  input UpdateUserInput {
    email: String
    password: String
    profile: String
    phoneNumber: String
  }
`;
