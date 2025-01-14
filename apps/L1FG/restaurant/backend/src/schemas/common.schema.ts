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
  }

  input InputItemsType {
    name: String
    quantity: Int
    price: Float
  }

  input InputType {
    tableId: Int
    items: [InputItemsType]
  }

  type OrderType {
    _id: ID
    items: [ItemsType]
    status: String
    createdAt: Date
    tableId: Int
  }

  type Query {
    sampleQuery: String!
    getOrders(tableId: Int): [OrderType]
  }

  type Mutation {
    sampleMutation: String!
    makeOrder(input: InputType!): OrderType
  }
`;
