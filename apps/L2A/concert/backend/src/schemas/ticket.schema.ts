import gql from 'graphql-tag';

export const TicketTypeDefs = gql`
  type Ticket {
    id: ID!
    concert: Concert!
    seatNumber: String!
    price: Int
    type: TicketType!
    status: TicketStatus!
    cancerRequest: Boolean!
    refundStatus: RefundStatus!
    createdAt: String!
    updatedAt: String!
  }
  enum RefundStatus {
    PENDING
    APPROVED
    REJECTED
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
