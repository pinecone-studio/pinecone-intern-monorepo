import { gql } from 'graphql-tag';

export const userSchema = gql`
  type User {
    id: ID
    name: String!
    email: String
    phoneNumber: String
    avatar: String
    role: String!
    otpExpiresIn: Int
    otp: String
  }
  input SignUpInput {
    email: String
    phoneNumber: String
    password: String!
  }

  input SignInInput {
    emailOrPhoneNumber: String!
    password: String!
  }

  input deleteUserInput {
    email: String!
  }

  input sendMailInput {
    email: String!
  }

  input resetPasswordInput {
    email: String!
    code: String!
    newPassword: String!
  }

  type Message {
    message: String!
  }

  type Token {
    token: String!
    message: String!
  }

  type Mutation {
    sendMail(input: sendMailInput!): Message!
    resetPassword(input: resetPasswordInput!): Message!
    signUp(input: SignUpInput!): Message!
    signIn(input: SignInInput!): Token!
    deleteUser(input: deleteUserInput!): Message!
  }
`;
