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

  input deleteUserInput {
    email: String!
  }

  type Message {
    message: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): Message!
    deleteUser(input: deleteUserInput!): Message!
  }
`;
