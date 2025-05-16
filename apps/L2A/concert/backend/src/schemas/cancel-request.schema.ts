import gql from 'graphql-tag';

export const RequestTypeDefs = gql`
  type Request {
    id: ID!
    concert: Concert!
    accountInfo: String!
    ownerName: String!
    ticket: Ticket!
    createdAt: String!
    status: RequestStatus!
  }
`;
