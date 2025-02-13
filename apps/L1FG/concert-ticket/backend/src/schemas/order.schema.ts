import gql from 'graphql-tag';

export const orderTypeDefs = gql`
  type VipTicket {
    quantity: Int
    price: Int
  }
  type RegularTicket {
    quantity: Int
    price: Int
  }
  type StandingAreaTicket {
    quantity: Int
    price: Int
  }

  type Order {
    userID: String!
    concertID: String!
    ticketID: String!
    phoneNumber: Int!
    email: String!
    totalPrice: Int!
    paymentType: String!
    ticketNumber: Int!
    vipTicket: VipTicket
    regularTicket: RegularTicket
    standingAreaTicket: StandingAreaTicket
    _id: ID
  }
  input VipTicketInput {
    quantity: Int
    price: Int
  }
  input RegularTicketInput {
    quantity: Int
    price: Int
  }
  input StandingAreaTicketInput {
    quantity: Int
    price: Int
  }
  input OrderInput {
    userID: String!
    concertID: String!
    ticketID: String!
    phoneNumber: Int!
    email: String!
    totalPrice: Int!
    paymentType: String!
    ticketNumber: Int!
    vipTicket: VipTicketInput
    regularTicket: RegularTicketInput
    standingAreaTicket: StandingAreaTicketInput
  }
  type Mutation {
    createOrder(input: OrderInput!): Order!
    deleteOrder(id: String!): Order!
  }
  type Query {
    getOrder(userID: String!): [Order!]
    getOrders: [Order!]
    getOrderTicketNumber(ticketNumber: Int!): Order!
  }
`;
