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
  input OrderUpdateInput {
    newPhoneNumber: String!
    newEmail: String!
    userId: String!
  }
  type UpdateEmail {
    email: String!
    password: String!
  }

  input DeleteReqInput {
    concertName: String!
    totalPrice: Int!
    userName: String!
    accountNumber: Int!
    bankName: String!
    orderId: String!
    reqStatus: Boolean!
  }
  type DeleteReq {
    concertName: String!
    totalPrice: Int!
    userName: String!
    accountNumber: Int!
    bankName: String!
    orderId: String!
    reqStatus: Boolean!
    _id: ID
  }
  type Mutation {
    createOrder(input: OrderInput!): Order!
    deleteOrder(id: String!): Order!
    orderUpdate(input: OrderUpdateInput!): UpdateEmail!
    createDeleteReq(input: DeleteReqInput!): DeleteReq!
  }
  type Query {
    getOrder(userID: String!): [Order!]
    getOrders: [Order!]
    getOrderTicketNumber(ticketNumber: Int!): Order!
  }
`;
