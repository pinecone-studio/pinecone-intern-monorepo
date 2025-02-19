import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON
  scalar Date

  enum Response {
    Success
  }

  type ItemsType {
    name: String
    quantity: Int
    price: Float
    imageUrl: String
  }

  input InputItemsType {
    name: String
    quantity: Int
    price: Float
    imageUrl: String
  }

  input InputType {
    tableId: Int
    userId: String
    items: [InputItemsType]
  }

  type OrderType {
    _id: ID
    items: [ItemsType]
    status: String
    createdAt: Date
    tableId: Int
    userId: String
    isRead: Boolean
  }

  type Query {
    sampleQuery: String!
    getOrders(tableId: Int): [OrderType]
    getOrdersForUser(userId: String!): [OrderType]
  }

  type Mutation {
    sampleMutation: String!
    makeOrder(input: InputType!): OrderType!
    updateOrderStatus(orderId: ID!, status: String!): OrderType!
    updateOrderRead(orderId: ID!): Response!
  }
`;
