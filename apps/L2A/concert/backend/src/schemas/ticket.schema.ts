import gql from 'graphql-tag';

export const TicketTypeDefs = gql`
  type Ticket {
    id: ID!
    concert: Concert!
    seatNumber: String!
    price: Int
    type: TicketType!
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  input CreateTicketInput {
    concert: ID!
    date: String!
    seatType: String!
    price: Int!
    status: TicketStatus
    userId: ID!
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
`;
