import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    phone: String
    isAdmin: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Response {
    success: Boolean!
    message: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    _id: ID!
    email: String
    password: String
    phone: String
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(_id: ID!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): Response!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(_id: ID!): Response!
  }
`;
