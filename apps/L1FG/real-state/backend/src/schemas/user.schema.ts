/* eslint-disable no-secrets/no-secrets */
import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    isAdmin: Boolean!
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
    name: String!
    email: String!
    phone: String!
    isAdmin: Boolean
    password: String!
  }

  input ChangePasswordInput {
    email: String!
    password: String!
    otp: String!
  }

  input RequestChangePasswordInput {
    email: String!
  }

  type RequestChangePasswordResponse {
    email: String!
  }

  type Query {
    getMe: User!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): AuthResponse!
    requestChangePassword(input: RequestChangePasswordInput!): RequestChangePasswordResponse!
    changePassword(input: ChangePasswordInput!): Response!
  }
`;
