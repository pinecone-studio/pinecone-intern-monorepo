import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    address: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    address: String!
    password: String!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): AuthResponse!
  }
`;
