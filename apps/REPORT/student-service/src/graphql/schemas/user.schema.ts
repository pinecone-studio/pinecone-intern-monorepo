import gql from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    roles: [Roles!]!
  }

  enum Roles {
    ADMIN
    STUDENT
  }

  input createUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    roles: [Roles!]!
  }

  input updateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    roles: [Roles]
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User]
    getUserById(_id: String!): User
  }

  type Token {
    token: String
    message: String
  }

  type Mutation {
    createUser(input: createUserInput!): User
    deleteUser(_id: ID!): User
    updateUser(_id: ID!, updateInput: updateUserInput!): User
    reportSignIn(input: SignInInput): Token!
  }
`;
