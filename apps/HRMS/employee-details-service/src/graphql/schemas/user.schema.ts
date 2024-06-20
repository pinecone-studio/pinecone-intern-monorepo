import { gql } from 'apollo-server-cloud-functions';

export const userSchema = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    role: Roles!
    password: String!
  }

  enum Roles {
    EMPLOYEE
    ADMIN
  }

  input ECreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    role: String
    password: String
  }

  type Query {
    getUsers: [User]
    getUser(_id: String!): User
  }

  type Mutation {
    createUser(input: ECreateUserInput): User!
    updatedUser(_id: ID!, input: UpdateUserInput!): User!
    deletedUser(_id: ID!): User
  }
`;
