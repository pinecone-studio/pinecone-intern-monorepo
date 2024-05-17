import { gql } from 'graphql-tag';

export const userSchema = gql`
  type User {
    id: ID
    name: String!
    password: String!
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

  type Message {
    message: String!
  }

  type Token {
    token: String!
    message: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): Message!
    signIn(input: SignInInput!): Token!
  }
`;
