import gql from 'graphql-tag';

export const typeDefs = gql`
  type SendQrToEmailResponse {
    success: Boolean!
    message: String
  }

  input SendQrInput {
    email: String!
    link: String!
  }

  type Mutation {
    sendQrToEmail(input: SendQrInput!): SendQrToEmailResponse!
  }
`;
