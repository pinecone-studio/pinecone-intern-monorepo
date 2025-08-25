import { gql } from 'apollo-server-cloud-functions';

export const orderTypeDefs = gql`
  enum FoodOrderStatus {
    READY
    PREPARING
    DONE
    PENDING
  }

  type FoodOrderItem {
    food: Food!
    quantity: Int!
  }

  type FoodOrder {
    orderId: ID!
    user: User!
    table: Table!
    orderNumber: Int!
    foodOrderItems: [FoodOrderItem!]!
    status: FoodOrderStatus!
    totalPrice: Float!
  }

  input FoodOrderItemInput {
    foodId: ID!
    quantity: Int!
  }

  input CreateFoodOrderInput {
    foodOrderItems: [FoodOrderItemInput!]!
    totalPrice: Float!
    status: FoodOrderStatus
  }

  input UpdateFoodOrderInput {
    orderId: ID!
    status: FoodOrderStatus!
  }

  type Query {
    foodOrders: [FoodOrder!]!
    foodOrderById(orderId: ID!): FoodOrder
    foodOrdersByUser(userId: ID!): [FoodOrder!]!
  }

  type Mutation {
    createFoodOrder(userId: ID!, tableId: ID!, input: CreateFoodOrderInput!): FoodOrder!
    updateFoodOrder(orderId: ID!, input: UpdateFoodOrderInput!): FoodOrder!
    deleteFoodOrder(orderId: ID!): FoodOrder!
  }
`;
