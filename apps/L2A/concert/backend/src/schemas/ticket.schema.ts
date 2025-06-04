import gql from 'graphql-tag';

export const TicketTypeDefs = gql`
  type Ticket {
    id: ID!
    concert: Concert!
    user: User!
    totalPrice: Int!
    ticket: TicketBreakdown!
    createdAt: String!
    updatedAt: String!
  }

  type TicketBreakdown {
    Standard: TicketTypeDetail!
    VIP: TicketTypeDetail!
    Backseat: TicketTypeDetail!
  }

  type TicketTypeDetail {
    count: Int!
    price: Int!
  }

  input TicketInput {
    type: String!
    count: Int!
    price: Int!
  }

  input CreateTicketOrderInput {
    userId: ID!
    concertId: ID!
    date: String!
    seatDataId: ID!
    tickets: [TicketInput!]!
    totalPrice: Int!
  }

  type TicketOrderPayload {
    tickets: Ticket!
    totalPrice: Int!
  }
`;
