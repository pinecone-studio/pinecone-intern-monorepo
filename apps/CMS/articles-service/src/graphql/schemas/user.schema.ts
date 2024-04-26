import { gql } from 'graphql-tag';

export const userSchema = gql`
  type User {
    id: ID
    name: String!
    email: String
    phoneNumber: String
    avatar: String!
    role: String!
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
    deleteUser(input: deleteUserInput!): Message!
  }
`;
