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
    otp: String!
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

  input PasswordRecoveryRequestInput {
    email: String!
  }

  input PasswordChangeInput {
    otp: String!
    email: String!
    password: String!
  }

  input PaginationInput {
    limit: Int
    offset: Int
  }

  type Query {
    getAllUsers(pagination: PaginationInput): [User!]!
    getUserById(_id: ID!): User!
  }

  type Mutation {
    signUpSendOtp(email: String!): Response!
    signIn(input: SignInInput!): AuthResponse!
    signUp(input: SignUpInput!): SignUpResponse!
    passwordRecoveryRequest(input: PasswordRecoveryRequestInput!): Response!
    passwordChange(input: PasswordChangeInput!): Response!
    deleteUser(_id: ID!): Response!
  }
`;
