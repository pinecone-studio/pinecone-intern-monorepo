import { gql } from 'apollo-server-cloud-functions';

export const cmsLoginTypeDefs = gql`
  input cmsLoginInput {
    email: String!
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
    cmsLogin(input: cmsLoginInput!): Token!
  }
`;
