import { gql } from 'apollo-server-cloud-functions';

export const ticketTypeDefs = gql`
  type Ticket {
    _id: ID!
    event: Event!
    user: User!
    price: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getTicket(_id: ID!): Ticket!
    getTickets: [Ticket!]!
  }

  type Mutation {
    createTicket(eventId: ID!, userId: ID!, price: Float!): Ticket!
    updateTicket(_id: ID!, status: String!): Ticket!
    deleteTicket(_id: ID!): Ticket!
  }
`;
