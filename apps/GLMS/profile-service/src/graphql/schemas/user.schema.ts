import { gql } from 'graphql-tag';

export const glmsUserTypeDefs = gql`
  enum Roles {
    TEACHER
    STUDENT
  }

  type glmsUser {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    roles: Roles!
    avatar: String!
  }

  input glmsCreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    roles: String!
    avatar: String!
  }

  input glmsUpdateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    roles: String
    avatar: String
  }

  input glmsLogInInput {
    email: String!
    password: String!
  }

  type Token {
    token: String
    message: String
  }

  type Query {
    getGlmsUsers: [glmsUser]
  }

  type Mutation {
    createGlmsUser(input: glmsCreateUserInput): glmsUser
    updateGlmsUser(_id: ID!, updateInput: glmsUpdateUserInput!): glmsUser
    deleteGlmsUser(_id: ID!): glmsUser
    glmsLogIn(logInput: glmsLogInInput): Token
  }
`;
