import gql from 'graphql-tag';

export const BookingTypeDefs = gql`
  type Booking {
    id: ID!
    user: User!
    concert: Concert!
    tickets: [Ticket]!
    status: BookingStatus!
    totalAmount: Int!
    createdAt: String!
  }
`;
