import gql from 'graphql-tag';

export const ticketTypeDefs = gql`
  input TicketInput {
    concertID: String!
    vipTicket: Int
    standartTicket: Int
    standingAreaTicket: Int
    ticketNumber: Int!
  }
  type Ticket {
    concertID: String!
    ticketNumber: Int!
    vipTicket: Int
    standartTicket: Int
    standingAreaTicket: Int
    _id: ID
  }
  type Mutation {
    createTicket(input: TicketInput!): Ticket!
    deleteTicket(ticketID: String): Ticket
  }
  type Query {
    getTicket(ticketNumber: Int!): Ticket!
    getTickets: [Ticket!]
  }
`;
