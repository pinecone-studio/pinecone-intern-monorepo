import { gql } from 'graphql-tag';

export const signSchema = gql`
  type Token {
    token: String!
    message: String!
  }
  input SignInput {
   emailorPhone: String!
  }
  type Mutation {
    signIn(input: SignInput!): Token!
  }
`;