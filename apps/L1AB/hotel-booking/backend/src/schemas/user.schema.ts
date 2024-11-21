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

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type SignUpResponse {
    user: User
    success: Boolean!
    message: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(_id: ID!): User!
  }

  type Mutation {
    signIn(input: SignInInput!): AuthResponse!
    signUp(input: SignUpInput!): SignUpResponse!
    deleteUser(_id: ID!): Response!
  }
`;
