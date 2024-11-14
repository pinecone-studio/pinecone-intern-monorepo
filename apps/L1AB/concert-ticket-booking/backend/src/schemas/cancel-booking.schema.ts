import gql from 'graphql-tag';

export const typeDefs = gql`
  type Cancel {
    _id: ID!
    eventId: Event!
    bankName: String!
    bankAccount: Int!
    status: String!
    userId: User!
    amountTotal: Int!
  }

  input CancelInput {
    eventId: ID!
    bankName: String!
    bankAccount: Int!
    status: String
    userId: ID!
    amountTotal: Int!
  }

  type Query {
    getAllCancelBooking: [Cancel!]!
  }

  type Mutation {
    createCancel(input: CancelInput!): Cancel!
  }
`;
