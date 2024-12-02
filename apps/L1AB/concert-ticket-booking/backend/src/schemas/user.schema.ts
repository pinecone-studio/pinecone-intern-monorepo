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

  type VerifyOtpResponse {
    success: Boolean
    email: String!
    accessToken: String!
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

  input VerifyOtpInput {
    email: String!
    otp: String!
  }

  input RecoverPasswordInput {
    email: String!
    accessToken: String!
    password: String!
  }

  input UserUpdateInput {
    name: String
    email: String
    password: String
    phone: String
  }
  input PasswordUpdateInput {
    oldPassword: String!
    newPassword: String!
  }

  type passwordUpdateResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    passwordUpdate(input: PasswordUpdateInput!): passwordUpdateResponse!
    signUpUser(input: SignUpUser!): AuthResponse!
    signInUser(input: SignInUser!): AuthResponse!
    createUser(input: SignUpUser!): User!
    updateUser(input: UserUpdateInput!): User!
    requestPasswordRecovery(input: RequestRecoverPasswordInput!): RequestRecoverPasswordResponse!
    verifyOtp(input: VerifyOtpInput!): VerifyOtpResponse!
    passwordRecovery(input: RecoverPasswordInput!): Response!
  }

  type Query {
    getAllUsers: [User!]!
    getMe: User
  }
`;
