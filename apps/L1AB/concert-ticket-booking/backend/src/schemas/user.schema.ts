import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    phone: String!
    role: String
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type RequestRecoverPasswordResponse {
    success: Boolean
    email: String!
  }

  enum UserRole {
    user
    admin
  }

  input SignUpUser {
    name: String!
    email: String!
    password: String!
    phone: String!
    role: UserRole
  }

  input SignInUser {
    email: String!
    password: String!
  }

  input RequestRecoverPasswordInput {
    email: String!
  }

  input RecoverPasswordInput {
    email: String!
    password: String!
    otp: String!
  }

  input UserUpdateInput {
    name: String
    email: String
    password: String
    phone: String
  }

  type Mutation {
    signUpUser(input: SignUpUser!): AuthResponse!
    signInUser(input: SignInUser!): AuthResponse!
    createUser(input: SignUpUser!): User!
    updateUser(input: UserUpdateInput!): User!
    requestPasswordRecovery(input: RequestRecoverPasswordInput!): RequestRecoverPasswordResponse!
    passwordRecovery(input: RecoverPasswordInput!): Response!
  }

  type Query {
    getAllUsers: [User!]!
    getMe: User
  }
`;
