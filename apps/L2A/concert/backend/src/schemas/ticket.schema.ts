import gql from "graphql-tag";

export const TicketTypeDefs = gql`
  type Ticket {
    id: ID!
    concert: Concert!
    seatNumber: String!
    price: Int
    type: TicketType!
    status: TicketStatus!
  }`;