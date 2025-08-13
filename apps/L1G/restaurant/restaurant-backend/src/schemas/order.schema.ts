import { gql } from 'apollo-server-cloud-functions';

export const orderTypeDefs = gql`
  type FoodOrderItem {
    food: Food!
    quantity: Int!
  }

  type FoodOrder {
    orderId: ID!
    user: User!
    totalPrice: Float!
    foodOrderItems: [FoodOrderItem!]!
    status: OrderStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum OrderStatus {
    PENDING
    IN_PROGRESS
    COMPLETED
    SERVED
  }

  input FoodOrderItemInput {
    food: ID!
    quantity: Int!
  }

  input CreateFoodOrderInput {
    user: ID!
    totalPrice: Float!
    foodOrderItems: [FoodOrderItemInput!]!
    status: OrderStatus = PENDING
  }

  input UpdateFoodOrderInput {
    totalPrice: Float
    foodOrderItems: [FoodOrderItemInput!]
    status: OrderStatus
  }

  type Query {
    getFoodOrders: [FoodOrder!]!
    getFoodOrderById(orderId: ID!): FoodOrder
    getFoodOrdersByUser(userId: ID!): [FoodOrder!]!
  }

  type Mutation {
    createFoodOrder(input: CreateFoodOrderInput!): FoodOrder!
    updateFoodOrder(orderId: ID!, input: UpdateFoodOrderInput!): FoodOrder!
    deleteFoodOrder(orderId: ID!): DeleteFoodOrderResponse!
  }

  type DeleteFoodOrderResponse {
    success: Boolean!
    message: String!
  }
`;
