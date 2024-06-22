import { gql } from 'graphql-tag';

export const glmsUserTypeDefs = gql`
  enum Roles {
    TEACHER
    STUDENT
  }

  type glmsUser {
    id: ID
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

  type Query {
    getGlmsUsers: [glmsUser]
  }

  type Mutation {
    createGlmsUser(input: glmsCreateUserInput): glmsUser
  }
`;
