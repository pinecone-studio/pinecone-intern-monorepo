import { gql } from 'apollo-server-cloud-functions';

export const authTypeDefs = gql`
  type Auth {
    token: String!
    user: User!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Mutation {
    signIn(input: SignInInput!): Auth!
  }
`;
