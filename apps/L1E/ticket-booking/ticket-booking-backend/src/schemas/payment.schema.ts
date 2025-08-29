import { gql } from 'apollo-server-cloud-functions';

export const paymentTypeDefs = gql`
  type Payment {
    _id: ID!
    ticket: Ticket!
    amount: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPayment(_id: ID!): Payment!
    getPayments: [Payment!]!
  }

  type Mutation {
    createPayment(ticketId: ID!, amount: Float!): Payment!
    updatePayment(_id: ID!, status: String!): Payment!
    deletePayment(_id: ID!): Payment!
  }
`;
