import { gql } from 'graphql-tag';

export const userSchema = gql`
  type User {
    id: ID
    name: String!
    password: String!
    email: String
    avatar: String
    role: String!
    otpExpiresIn: Int
    otp: String
  }
  input SignUpInput {
    email: String
    password: String
    name : String
    role : String
  }

  type Mutation {
    signUp(userInput: SignUpInput!): User!
  }
`;
