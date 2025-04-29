import gql from 'graphql-tag';

export const typeDefs = gql`
  input CreateBookingInput {
    userId: ID!
    concertId: ID!
  }
  input TicketCategoryInput {
    type: TicketType!
    price: Int!
    capacity: Int!
  }
`;
