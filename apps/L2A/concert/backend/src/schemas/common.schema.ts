import gql from 'graphql-tag';

export const typeDefs = gql`
  input CreateBookingInput {
    userId: ID!
    concertId: ID!
    ticketIds: [ID]!
  }
  input TicketCategoryInput {
    type: TicketType!
    price: Int!
    capacity: Int!
  }
`;
