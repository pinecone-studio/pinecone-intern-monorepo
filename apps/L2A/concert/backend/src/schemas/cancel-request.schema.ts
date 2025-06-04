import gql from 'graphql-tag';

export const RequestTypeDefs = gql`
  type Request {
    id: ID!
    concert: Concert!
    user: User!
    ticket: Ticket!
    createdAt: String!
    status: RequestStatus!
    bankName: String!
    accountNumber: String!
    bankOwnerName: String!
  }
`;
