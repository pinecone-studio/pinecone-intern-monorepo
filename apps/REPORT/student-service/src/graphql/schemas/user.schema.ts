import gql from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: Roles!
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
    role: String!
  }

  input deleteUserInput {
    id: ID!
  }

  input updateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(input: createUserInput!): Student
    deleteUser(id: ID!): ID
    updateUser(id: ID!, input: updateUserInput!): ID
  }
`;
