import { gql } from 'graphql-tag';

export const signSchema = gql`
  type Token {
    token: String!
    message: String!
  }
  input SignInInput {
    emailOrPhoneNumber: String!
  }
  type Mutation {
    signIn(input: SignInInput!): Token!
  }
`;
