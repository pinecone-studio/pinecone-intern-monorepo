import gql from 'graphql-tag';

export const typeDefs = gql`
  type SendQrToEmailResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    sendQrToEmail: SendQrToEmailResponse!
  }
`;
