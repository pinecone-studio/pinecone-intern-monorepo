import gql from 'graphql-tag';

export const TicketTypeDefs = gql`
  type Ticket {
    id: ID!
    concert: Concert!
    seatNumber: String!
    price: Int
    type: TicketType!
    status: TicketStatus!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTicketInput {
    concert: ID!
    date: String!
    seatType: String!
    price: Int!
    status: TicketStatus
    userId: ID!
  }
`;
